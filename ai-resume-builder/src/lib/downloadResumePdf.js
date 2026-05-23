import { RESUME_EXPORT_CSS } from './resumeExportStyles'

/** A4 capture — lower scale + JPEG keeps PDFs under ~500KB for ATS upload */
const CAPTURE_SCALE = 1.25
const JPEG_QUALITY = 0.82

function getSafeFileName(title) {
  const base = (title || 'resume').replace(/[^\w\s-]/g, '').trim() || 'resume'
  return base.endsWith('.pdf') ? base : `${base}.pdf`
}

const SAFE_CLASSES = new Set([
  'resume-export',
  'resume-a4-export',
  'pro-exp-html',
])

const LAYOUT_PROPS = [
  'display',
  'flexDirection',
  'flexWrap',
  'justifyContent',
  'alignItems',
  'gap',
  'width',
  'maxWidth',
  'margin',
  'marginTop',
  'marginBottom',
  'marginLeft',
  'marginRight',
  'padding',
  'paddingTop',
  'paddingBottom',
  'paddingLeft',
  'paddingRight',
  'borderBottom',
  'borderBottomWidth',
  'borderBottomStyle',
  'borderBottomColor',
  'fontFamily',
  'fontSize',
  'fontWeight',
  'fontStyle',
  'lineHeight',
  'color',
  'backgroundColor',
  'textAlign',
  'textTransform',
  'letterSpacing',
  'textDecoration',
  'listStyleType',
  'whiteSpace',
]

function hasUnsupportedColor(value) {
  if (!value) return false
  return /oklch|lab\(|lch\(|color-mix/i.test(value)
}

function safeColorValue(prop, value) {
  if (!hasUnsupportedColor(value)) return value
  if (prop.includes('background')) return '#ffffff'
  if (prop.includes('border')) return '#000000'
  return '#000000'
}

function toKebab(prop) {
  return prop.replace(/([A-Z])/g, '-$1').toLowerCase()
}

function copyLayoutStyles(sourceEl, targetEl, sourceWin) {
  const computed = sourceWin.getComputedStyle(sourceEl)
  LAYOUT_PROPS.forEach((prop) => {
    const kebab = toKebab(prop)
    let value = computed.getPropertyValue(kebab)
    if (!value || value === 'initial') return
    value = safeColorValue(kebab, value)
    targetEl.style.setProperty(kebab, value)
  })
}

function copyAllLayoutStyles(sourceRoot, targetRoot, sourceWin) {
  const sourceNodes = [sourceRoot, ...sourceRoot.querySelectorAll('*')]
  const targetNodes = [targetRoot, ...targetRoot.querySelectorAll('*')]
  sourceNodes.forEach((source, i) => {
    if (targetNodes[i]) copyLayoutStyles(source, targetNodes[i], sourceWin)
  })
}

function sanitizeElementTree(root) {
  const walk = (el) => {
    if (el.classList?.length) {
      const kept = [...el.classList].filter((c) => SAFE_CLASSES.has(c))
      el.className = kept.join(' ')
    }

    if (el.style?.length) {
      for (let i = 0; i < el.style.length; i++) {
        const prop = el.style[i]
        const val = el.style.getPropertyValue(prop)
        if (hasUnsupportedColor(val)) {
          el.style.setProperty(prop, safeColorValue(prop, val))
        }
      }
    }

    Array.from(el.children || []).forEach(walk)
  }
  walk(root)
}

function buildIsolatedPageClone(exportPage, iframeDoc, sourceWin) {
  const clone = exportPage.cloneNode(true)
  sanitizeElementTree(clone)
  clone.style.background = '#ffffff'
  clone.style.color = '#000000'
  clone.style.boxSizing = 'border-box'
  clone.style.overflow = 'hidden'
  clone.style.width = '210mm'
  clone.style.height = '297mm'
  iframeDoc.body.appendChild(clone)
  copyAllLayoutStyles(exportPage, clone, sourceWin)
  return clone
}

async function captureElement(html2canvas, element) {
  return html2canvas(element, {
    scale: CAPTURE_SCALE,
    useCORS: true,
    logging: false,
    backgroundColor: '#ffffff',
    windowWidth: element.scrollWidth,
    windowHeight: element.scrollHeight,
    width: element.scrollWidth,
    height: element.scrollHeight,
    foreignObjectRendering: false,
    onclone: (clonedDoc) => {
      clonedDoc.querySelectorAll('link[rel="stylesheet"]').forEach((n) => n.remove())
      const style = clonedDoc.createElement('style')
      style.textContent = RESUME_EXPORT_CSS
      clonedDoc.head.appendChild(style)
    },
  })
}

async function buildPdfFromElement(element) {
  if (!element) {
    throw new Error('Resume preview is not ready')
  }

  const pageElements = element.querySelectorAll('[data-resume-page]')

  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import('html2canvas'),
    import('jspdf'),
  ])

  await new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  })

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  const iframe = document.createElement('iframe')
  iframe.setAttribute('aria-hidden', 'true')
  iframe.style.cssText =
    'position:fixed;left:-10000px;top:0;border:0;visibility:hidden;'
  document.body.appendChild(iframe)

  const iframeDoc = iframe.contentDocument
  iframeDoc.open()
  iframeDoc.write(`<!DOCTYPE html>
<html><head><meta charset="utf-8"><style>${RESUME_EXPORT_CSS}</style></head>
<body style="margin:0;padding:0;background:#ffffff;"></body></html>`)
  iframeDoc.close()

  try {
    await new Promise((resolve) => setTimeout(resolve, 100))

    const pagesToCapture =
      pageElements.length > 0
        ? Array.from(pageElements).sort(
            (a, b) =>
              Number(a.getAttribute('data-resume-page') ?? 0) -
              Number(b.getAttribute('data-resume-page') ?? 0),
          )
        : [
            element.querySelector('#resume-pdf-preview') ||
              element.querySelector('.resume-a4-export') ||
              element,
          ]

    for (let i = 0; i < pagesToCapture.length; i++) {
      iframeDoc.body.innerHTML = ''
      const clone = buildIsolatedPageClone(
        pagesToCapture[i],
        iframeDoc,
        window,
      )

      await new Promise((resolve) => setTimeout(resolve, 50))

      const canvas = await captureElement(html2canvas, clone)

      if (!canvas.width || !canvas.height) {
        throw new Error('Could not capture resume preview')
      }

      const imgData = canvas.toDataURL('image/jpeg', JPEG_QUALITY)
      const imgWidth = pageWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      if (i > 0) pdf.addPage()

      if (imgHeight <= pageHeight + 1) {
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, imgHeight, undefined, 'FAST')
      } else {
        pdf.addImage(imgData, 'JPEG', 0, 0, imgWidth, pageHeight, undefined, 'FAST')
      }
    }

    return pdf
  } finally {
    if (iframe.parentNode) iframe.parentNode.removeChild(iframe)
  }
}

/** Returns a compressed PDF Blob (typically 200KB–1MB). */
export async function generateResumePdfBlob(element) {
  const pdf = await buildPdfFromElement(element)
  return pdf.output('blob')
}

export async function downloadResumePdf(element, fileName = 'resume.pdf') {
  const blob = await generateResumePdfBlob(element)
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = getSafeFileName(fileName.replace(/\.pdf$/i, ''))
  link.click()
  URL.revokeObjectURL(url)
}

export { getSafeFileName }

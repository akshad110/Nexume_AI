import { jsPDF } from 'jspdf'
import { domToCanvas } from 'modern-screenshot'
import { resumeToPlainText } from './resumeToPlainText'
import { mountExportPreview, waitForExportReady } from './exportResumeMount'

const CAPTURE_SCALE = 2

function getSafeFileName(title) {
  const base = (title || 'resume').replace(/[^\w\s.-]/g, '').trim() || 'resume'
  return base.endsWith('.pdf') ? base : `${base}.pdf`
}

/** Plain-text PDF — ATS upload only. */
export async function buildTextPdfFromResume(resume) {
  const text = resumeToPlainText(resume)
  if (!text.trim()) {
    throw new Error('Resume has no content to export')
  }

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const margin = 14
  const pageHeight = pdf.internal.pageSize.getHeight()
  const maxWidth = pdf.internal.pageSize.getWidth() - margin * 2
  let y = margin
  const bodyLineHeight = 5
  const sectionLineHeight = 6

  const ensureSpace = (needed) => {
    if (y + needed > pageHeight - margin) {
      pdf.addPage()
      y = margin
    }
  }

  const writeLines = (lines, { bold = false, size = 11 } = {}) => {
    pdf.setFont('helvetica', bold ? 'bold' : 'normal')
    pdf.setFontSize(size)
    const lh = bold ? sectionLineHeight : bodyLineHeight
    for (const line of lines) {
      ensureSpace(lh)
      pdf.text(line, margin, y)
      y += lh
    }
  }

  for (const raw of text.split('\n')) {
    const para = raw.trim()
    if (!para) {
      y += 2
      continue
    }
    const isSection =
      para.length < 40 &&
      para === para.toUpperCase() &&
      /^[A-Z][A-Z\s&]+$/.test(para)
    if (isSection) {
      ensureSpace(sectionLineHeight + 2)
      y += 2
      writeLines(pdf.splitTextToSize(para, maxWidth), { bold: true, size: 12 })
      y += 1
    } else {
      writeLines(pdf.splitTextToSize(para, maxWidth))
    }
  }

  return pdf
}

export async function generateResumePdfBlobFromData(resume) {
  const pdf = await buildTextPdfFromResume(resume)
  return pdf.output('blob', { type: 'application/pdf' })
}

function getPagesToCapture(previewRoot) {
  const pageElements = previewRoot.querySelectorAll('[data-resume-page]')
  if (pageElements.length > 0) {
    return Array.from(pageElements).sort(
      (a, b) =>
        Number(a.getAttribute('data-resume-page') ?? 0) -
        Number(b.getAttribute('data-resume-page') ?? 0),
    )
  }
  const single =
    previewRoot.querySelector('#resume-pdf-preview') ||
    previewRoot.querySelector('.resume-a4-export') ||
    previewRoot
  return [single]
}

/** Screenshot one A4 page — modern-screenshot keeps Tailwind layout (oklch-safe). */
async function capturePageElement(pageEl) {
  pageEl.querySelectorAll('[data-pdf-hide]').forEach((el) => {
    el.style.setProperty('display', 'none', 'important')
  })

  const width = pageEl.offsetWidth
  const height = pageEl.offsetHeight

  return domToCanvas(pageEl, {
    scale: CAPTURE_SCALE,
    backgroundColor: '#ffffff',
    width,
    height,
  })
}

function wrapResumeTextForPdf(pdf, resume) {
  const fullText = resumeToPlainText(resume)
  if (!fullText.trim()) return []

  const margin = 12
  const maxWidth = pdf.internal.pageSize.getWidth() - margin * 2
  const wrappedLines = []

  for (const paragraph of fullText.split('\n')) {
    const lines = pdf.splitTextToSize(paragraph.trim() || ' ', maxWidth)
    wrappedLines.push(...lines)
    wrappedLines.push('')
  }

  return wrappedLines
}

/**
 * White text drawn *before* the page image so ATS tools can extract it
 * while the opaque screenshot fully covers it (no white holes on top).
 */
function addAtsTextSlice(pdf, wrappedLines, startIndex, maxLines) {
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 12
  let y = margin
  let count = 0
  let lineIndex = startIndex

  pdf.setFont('helvetica', 'normal')
  pdf.setFontSize(9)
  pdf.setTextColor(255, 255, 255)

  while (
    count < maxLines &&
    lineIndex < wrappedLines.length &&
    y < pageHeight - margin
  ) {
    const line = wrappedLines[lineIndex]
    if (line) pdf.text(line, margin, y)
    y += line ? 4.2 : 2
    lineIndex += 1
    count += 1
  }

  return lineIndex
}

export async function buildVisualPdfFromElement(previewRoot, resume = null) {
  if (!previewRoot) {
    throw new Error('Resume preview is not ready')
  }

  if (document.fonts?.ready) {
    await document.fonts.ready
  }
  await new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(resolve))
  })

  const pagesToCapture = getPagesToCapture(previewRoot)
  if (!pagesToCapture.length) {
    throw new Error('No resume pages found to export')
  }

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()

  const wrappedLines = resume ? wrapResumeTextForPdf(pdf, resume) : []
  const linesPerPage =
    wrappedLines.length > 0
      ? Math.ceil(wrappedLines.length / pagesToCapture.length)
      : 0
  let atsLineIndex = 0

  for (let i = 0; i < pagesToCapture.length; i += 1) {
    if (i > 0) pdf.addPage()

    if (wrappedLines.length > 0) {
      atsLineIndex = addAtsTextSlice(
        pdf,
        wrappedLines,
        atsLineIndex,
        linesPerPage,
      )
    }

    const canvas = await capturePageElement(pagesToCapture[i])
    if (!canvas.width || !canvas.height) {
      throw new Error('Could not capture resume page')
    }
    const imgData = canvas.toDataURL('image/png')
    const imgWidth = pageWidth
    const imgHeight = (canvas.height * imgWidth) / canvas.width
    pdf.addImage(
      imgData,
      'PNG',
      0,
      0,
      imgWidth,
      Math.min(imgHeight, pageHeight),
      undefined,
      'SLOW',
    )
  }

  return pdf
}

async function resolveCaptureRoot(resume) {
  const mountEl = document.createElement('div')
  mountEl.setAttribute('data-export-mount', 'true')
  mountEl.style.cssText =
    'position:fixed;left:0;top:0;z-index:-1;opacity:0.01;pointer-events:none;overflow:visible;'
  document.body.appendChild(mountEl)

  const reactRoot = mountExportPreview(resume, mountEl)
  try {
    const captureRoot = await waitForExportReady(mountEl)
    return {
      captureRoot,
      cleanup: () => {
        reactRoot.unmount()
        mountEl.remove()
      },
    }
  } catch (err) {
    reactRoot.unmount()
    mountEl.remove()
    throw err
  }
}

export async function downloadStyledResumePdf(
  previewRoot,
  fileName = 'resume.pdf',
  resume = null,
) {
  const pdf = await buildVisualPdfFromElement(previewRoot, resume)
  pdf.save(getSafeFileName(fileName.replace(/\.pdf$/i, '')))
}

/** Download PDF — pixel-perfect match to template preview. */
export async function downloadResumePdf(resume, fileName = 'resume.pdf') {
  if (!resume) {
    throw new Error('Resume data is missing')
  }

  const { captureRoot, cleanup } = await resolveCaptureRoot(resume)
  try {
    const pdf = await buildVisualPdfFromElement(captureRoot, resume)
    pdf.save(getSafeFileName(fileName.replace(/\.pdf$/i, '')))
  } finally {
    cleanup?.()
  }
}

/** ATS-friendly PDF file (includes hidden text layer when built from visual export). */
export async function resumeToPdfFile(resume, fileName = 'resume.pdf') {
  const { captureRoot, cleanup } = await resolveCaptureRoot(resume)
  try {
    const pdf = await buildVisualPdfFromElement(captureRoot, resume)
    const blob = pdf.output('blob', { type: 'application/pdf' })
    const safeName = getSafeFileName(fileName.replace(/\.pdf$/i, ''))
    return new File([blob], safeName, { type: 'application/pdf' })
  } finally {
    cleanup?.()
  }
}

export { getSafeFileName }

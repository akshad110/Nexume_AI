import { createElement } from 'react'
import { createRoot } from 'react-dom/client'
import ResumePreview from '@/Dashboard/resume/component/ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeContext'

/**
 * Mount ResumePreview off-screen for PDF capture (full template + pagination).
 */
export function mountExportPreview(resume, container) {
  const root = createRoot(container)
  root.render(
    createElement(
      ResumeInfoContext.Provider,
      {
        value: {
          resumeInfo: resume,
          setResumeInfo: () => {},
        },
      },
      createElement(ResumePreview, { forExport: true }),
    ),
  )
  return root
}

export function getExportCaptureRoot(container) {
  return (
    container.querySelector('[data-resume-preview-root]') || container
  )
}

/** Wait until paginated strips are filled from the measure layer. */
export async function waitForExportReady(container, maxWaitMs = 4000) {
  const start = Date.now()

  while (Date.now() - start < maxWaitMs) {
    const pages = container.querySelectorAll('[data-resume-page]')
    if (pages.length > 0) {
      const firstStrip = pages[0].querySelector('[data-resume-viewport] > div')
      if (firstStrip?.innerHTML?.trim().length > 20) {
        if (document.fonts?.ready) {
          await document.fonts.ready
        }
        await new Promise((r) => {
          requestAnimationFrame(() => requestAnimationFrame(r))
        })
        await new Promise((r) => setTimeout(r, 200))
        return getExportCaptureRoot(container)
      }
    }
    await new Promise((r) => setTimeout(r, 80))
  }

  throw new Error('Could not prepare resume for PDF export')
}

export function isCaptureReady(container) {
  if (!container) return false
  const pages = container.querySelectorAll('[data-resume-page]')
  if (!pages.length) return false
  const firstStrip = pages[0].querySelector('[data-resume-viewport] > div')
  return Boolean(firstStrip?.innerHTML?.trim().length > 20)
}

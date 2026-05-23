/** A4 page dimensions (must match PaginatedResumePreview) */
export const A4_WIDTH_MM = 210
export const A4_HEIGHT_MM = 297
export const A4_PADDING_V_MM = 14
export const A4_PADDING_H_MM = 16
export const A4_CONTENT_HEIGHT_MM = A4_HEIGHT_MM - A4_PADDING_V_MM * 2

export function mmToPx(mm) {
  return (mm / 25.4) * 96
}

/** Read how many px the browser uses for a mm-based size (varies slightly by display). */
export function readMmSizePx(mm, axis = 'height') {
  if (typeof document === 'undefined') return mmToPx(mm)
  const prop = axis === 'width' ? 'width' : 'height'
  const probe = document.createElement('div')
  probe.style.cssText = `position:fixed;left:-9999px;top:0;${prop}:${mm}mm;visibility:hidden;pointer-events:none;`
  document.body.appendChild(probe)
  const px = axis === 'width' ? probe.offsetWidth : probe.offsetHeight
  document.body.removeChild(probe)
  return px > 0 ? px : mmToPx(mm)
}

/** @deprecated use readMmSizePx(mm, 'height') */
export function readMmHeightPx(mm) {
  return readMmSizePx(mm, 'height')
}

/** True content height even when scrollHeight is wrong on hidden/fixed nodes. */
export function measureContentHeight(root) {
  if (!root) return 0

  const scrollH = root.scrollHeight
  const offsetH = root.offsetHeight

  const rootRect = root.getBoundingClientRect()
  let maxBottom = 0

  const nodes = root.querySelectorAll('*')
  for (let i = 0; i < nodes.length; i += 1) {
    const el = nodes[i]
    const rect = el.getBoundingClientRect()
    if (rect.height < 1) continue
    maxBottom = Math.max(maxBottom, rect.bottom - rootRect.top)
  }

  return Math.ceil(Math.max(scrollH, offsetH, maxBottom))
}

export function getPageCount(contentHeightPx, pageContentPx) {
  if (!contentHeightPx || !pageContentPx) return 1
  if (contentHeightPx <= pageContentPx + 2) return 1
  return Math.ceil(contentHeightPx / pageContentPx)
}

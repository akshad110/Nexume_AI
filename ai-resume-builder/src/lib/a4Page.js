/** A4 page dimensions (must match CSS in A4ResumeWrapper) */
export const A4_WIDTH_MM = 210
export const A4_HEIGHT_MM = 297
export const A4_PADDING_V_MM = 14
export const A4_PADDING_H_MM = 16
export const A4_CONTENT_HEIGHT_MM = A4_HEIGHT_MM - A4_PADDING_V_MM * 2

export function mmToPx(mm) {
  return (mm / 25.4) * 96
}

/** Avoid a second page from subpixel rounding or tiny bottom margins */
export const PAGE_OVERFLOW_TOLERANCE_PX = 16

export function getPageCount(contentHeightPx) {
  const pageContentPx = mmToPx(A4_CONTENT_HEIGHT_MM)
  if (
    !contentHeightPx ||
    contentHeightPx <= pageContentPx + PAGE_OVERFLOW_TOLERANCE_PX
  ) {
    return 1
  }
  return Math.ceil(
    (contentHeightPx - PAGE_OVERFLOW_TOLERANCE_PX) / pageContentPx,
  )
}

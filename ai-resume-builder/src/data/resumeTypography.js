/** User-selectable font sizes (px) — applied uniformly per role across all templates */

export const FONT_SIZE_MIN = 8
export const FONT_SIZE_MAX = 20

export const DEFAULT_HEADING_FONT_SIZE = 12
export const DEFAULT_BODY_FONT_SIZE = 11

function buildSizeOptions(defaultValue) {
  return Array.from({ length: FONT_SIZE_MAX - FONT_SIZE_MIN + 1 }, (_, i) => {
    const value = FONT_SIZE_MIN + i
    return {
      value,
      label: value === defaultValue ? `${value}px (default)` : `${value}px`,
    }
  })
}

export const HEADING_FONT_SIZE_OPTIONS = buildSizeOptions(DEFAULT_HEADING_FONT_SIZE)
export const BODY_FONT_SIZE_OPTIONS = buildSizeOptions(DEFAULT_BODY_FONT_SIZE)

function clampSize(value, fallback, min = FONT_SIZE_MIN, max = FONT_SIZE_MAX) {
  const n = Number(value)
  if (!Number.isFinite(n)) return fallback
  return Math.min(max, Math.max(min, Math.round(n)))
}

/** Resolved typography tokens for preview + PDF export */
export function getResumeTypography(resumeInfo) {
  const headingNum = clampSize(
    resumeInfo?.headingFontSize,
    DEFAULT_HEADING_FONT_SIZE,
  )
  const bodyNum = clampSize(resumeInfo?.bodyFontSize, DEFAULT_BODY_FONT_SIZE)
  const smallNum = Math.max(bodyNum - 1, FONT_SIZE_MIN)

  return {
    headingNum,
    bodyNum,
    smallNum,
    base: `${Math.min(bodyNum + 1, FONT_SIZE_MAX)}px`,
    body: `${bodyNum}px`,
    small: `${smallNum}px`,
    section: `${headingNum}px`,
    name: `${Math.min(Math.round(headingNum * 2.05), FONT_SIZE_MAX + 12)}px`,
  }
}

export function getActiveHeadingSize(resumeInfo) {
  return clampSize(resumeInfo?.headingFontSize, DEFAULT_HEADING_FONT_SIZE)
}

export function getActiveBodySize(resumeInfo) {
  return clampSize(resumeInfo?.bodyFontSize, DEFAULT_BODY_FONT_SIZE)
}

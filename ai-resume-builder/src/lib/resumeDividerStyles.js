/** PDF-safe divider lines (inline + export CSS — not Tailwind/oklch). */

export const MODERN_HEADER_DIVIDER = {
  borderBottom: '1px solid #d1d5db',
  paddingBottom: '12px',
  marginBottom: '16px',
}

export const MODERN_SECTION_DIVIDER = {
  borderBottom: '1px solid #9ca3af',
  paddingBottom: '4px',
  marginBottom: '8px',
}

export function classicHrStyle(themeColor = '#333333') {
  return {
    border: 'none',
    borderTopWidth: '1.5px',
    borderTopStyle: 'solid',
    borderTopColor: themeColor,
    margin: '8px 0',
    height: 0,
    width: '100%',
  }
}

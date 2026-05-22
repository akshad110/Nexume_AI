export const RESUME_THEMES = [
  { id: 'black', name: 'Black', color: '#171717' },
  { id: 'red', name: 'Red', color: '#dc2626' },
  { id: 'blue', name: 'Blue', color: '#2563eb' },
  { id: 'green', name: 'Green', color: '#16a34a' },
  { id: 'purple', name: 'Purple', color: '#7c3aed' },
]

export const DEFAULT_THEME_COLOR = RESUME_THEMES[0].color

export function getActiveTheme(themeColor) {
  if (!themeColor) return RESUME_THEMES[0]
  const normalized = themeColor.toLowerCase()
  return (
    RESUME_THEMES.find((t) => t.color.toLowerCase() === normalized) ||
    RESUME_THEMES[0]
  )
}

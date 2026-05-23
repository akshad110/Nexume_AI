/** Injected during PDF capture — no Tailwind/oklch dependency */
export const RESUME_EXPORT_CSS = `
  .resume-export, .resume-export * {
    box-sizing: border-box;
    color: #000000;
  }
  .resume-export {
    font-size: 11px;
    line-height: 1.35;
    background: #ffffff;
  }
  .resume-export h1,
  .resume-export h2,
  .resume-export h3,
  .resume-export p,
  .resume-export li,
  .resume-export span {
    color: #000000;
  }
  .resume-export ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .resume-export .pro-exp-html ul {
    list-style-type: disc;
    margin: 4px 0 4px 18px;
    padding: 0;
  }
  .resume-export .pro-exp-html ol {
    list-style-type: decimal;
    margin: 4px 0 4px 18px;
    padding: 0;
  }
  .resume-export .pro-exp-html li {
    margin-bottom: 2px;
  }
  .resume-export .pro-exp-html p {
    margin: 0 0 2px 0;
  }
  .resume-export a {
    color: inherit;
    text-decoration: underline;
  }
`

/** Template 2 (Professional) — slightly larger than default export scale */
export const PROFESSIONAL_FONT = {
  base: '12px',
  body: '11px',
  small: '10px',
  name: '24px',
  section: '12px',
}

/** Template 3 (Modern) — matches professional scale */
export const MODERN_FONT = {
  base: '12px',
  body: '11px',
  small: '10px',
  name: '26px',
  section: '14px',
}

export const proRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '12px',
  width: '100%',
}

export const proSectionTitle = (color = '#000000') => ({
  fontSize: PROFESSIONAL_FONT.section,
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  margin: '0 0 4px 0',
  paddingBottom: '3px',
  borderBottom: '1px solid #000000',
  color,
})

export const proName = (color = '#000000') => ({
  fontSize: PROFESSIONAL_FONT.name,
  fontWeight: '700',
  lineHeight: 1.2,
  margin: 0,
  color,
})

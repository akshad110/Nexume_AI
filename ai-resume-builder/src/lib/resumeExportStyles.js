/** Injected during PDF capture — no Tailwind/oklch dependency */
export const RESUME_EXPORT_CSS = `
  .resume-export, .resume-export * {
    box-sizing: border-box;
    color: #000000;
  }
  .resume-export {
    font-family: Georgia, "Times New Roman", Times, serif;
    font-size: 11px;
    line-height: 1.35;
    background: #ffffff;
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

export const proRow = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '12px',
  width: '100%',
}

export const proSectionTitle = (color = '#000000') => ({
  fontSize: '11px',
  fontWeight: '700',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  margin: '0 0 4px 0',
  paddingBottom: '3px',
  borderBottom: '1px solid #000000',
  color,
})

export const proName = (color = '#000000') => ({
  fontSize: '22px',
  fontWeight: '700',
  lineHeight: 1.2,
  margin: 0,
  color,
})

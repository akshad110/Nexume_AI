/** Strip HTML tags for plain-text export (ATS-friendly). */
function stripHtml(html) {
  if (!html) return ''
  const div = document.createElement('div')
  div.innerHTML = html
  return (div.textContent || div.innerText || '').replace(/\s+/g, ' ').trim()
}

/**
 * Build searchable plain text from resume data (best format for ATS analysis).
 */
export function resumeToPlainText(resume) {
  if (!resume) return ''

  const lines = []

  const name = [resume.firstName, resume.lastName].filter(Boolean).join(' ')
  if (name) lines.push(name)
  if (resume.jobTitle) lines.push(resume.jobTitle)
  if (resume.email) lines.push(`Email: ${resume.email}`)
  if (resume.phone) lines.push(`Phone: ${resume.phone}`)
  if (resume.address) lines.push(resume.address)
  if (resume.website) lines.push(`Website: ${resume.website}`)

  if (resume.summery) {
    lines.push('', 'SUMMARY', stripHtml(resume.summery))
  }

  if (Array.isArray(resume.experience) && resume.experience.length) {
    lines.push('', 'EXPERIENCE')
    resume.experience.forEach((exp) => {
      const header = [exp.title, exp.companyName].filter(Boolean).join(' — ')
      if (header) lines.push(header)
      const loc = [exp.city, exp.state].filter(Boolean).join(', ')
      const dates = [exp.startDate, exp.endDate].filter(Boolean).join(' – ')
      if (loc || dates) lines.push([loc, dates].filter(Boolean).join(' | '))
      const body = stripHtml(exp.workSummery)
      if (body) lines.push(body)
      lines.push('')
    })
  }

  if (Array.isArray(resume.education) && resume.education.length) {
    lines.push('EDUCATION')
    resume.education.forEach((edu) => {
      lines.push(
        [edu.degree, edu.university, edu.city].filter(Boolean).join(', '),
      )
      if (edu.startDate || edu.endDate) {
        lines.push([edu.startDate, edu.endDate].filter(Boolean).join(' – '))
      }
    })
    lines.push('')
  }

  if (Array.isArray(resume.skills) && resume.skills.length) {
    lines.push(
      'SKILLS',
      resume.skills.map((s) => s.name).filter(Boolean).join(', '),
    )
  }

  const ps = resume.programmingSkills
  if (ps?.languages || ps?.technologies) {
    lines.push('', 'PROGRAMMING')
    if (ps.languages) lines.push(`Languages: ${ps.languages}`)
    if (ps.technologies) lines.push(`Technologies: ${ps.technologies}`)
  }

  if (Array.isArray(resume.projects) && resume.projects.length) {
    lines.push('', 'PROJECTS')
    resume.projects.forEach((p) => {
      if (p.name) lines.push(p.name)
      const desc = stripHtml(p.description)
      if (desc) lines.push(desc)
    })
  }

  return lines.join('\n').trim()
}

/** Create a small .txt File for ATS upload. */
export function resumeToTextFile(resume, fileName = 'resume.txt') {
  const text = resumeToPlainText(resume)
  const safeName = fileName.endsWith('.txt') ? fileName : `${fileName}.txt`
  return new File([text], safeName.replace(/[^\w\s.-]/g, '_'), {
    type: 'text/plain',
  })
}

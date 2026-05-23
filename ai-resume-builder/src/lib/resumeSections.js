/** Whether the experience block appears on the resume preview/PDF */
export function isExperienceEnabled(resumeInfo) {
  return resumeInfo?.sectionVisibility?.experience !== false
}

export function hasExperienceContent(resumeInfo) {
  if (!isExperienceEnabled(resumeInfo)) return false
  return (resumeInfo?.experience ?? []).some(
    (e) => e?.title || e?.companyName || e?.workSummery,
  )
}

export function getCustomSections(resumeInfo) {
  return (resumeInfo?.customSections ?? []).filter(
    (s) => s?.title?.trim() || s?.content?.trim(),
  )
}

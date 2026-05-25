export const RESUME_SECTION_META = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'customSections', label: 'Custom sections' },
]

import { getDefaultSectionOrder } from '@/data/resumeTemplates'

export const DEFAULT_SECTION_ORDER = RESUME_SECTION_META.map((s) => s.id)

const DEFAULT_VISIBILITY = Object.fromEntries(
  DEFAULT_SECTION_ORDER.map((id) => [id, true]),
)

export function getSectionOrder(resumeInfo) {
  const templateDefault = getDefaultSectionOrder(resumeInfo?.templateId)
  const saved = resumeInfo?.sectionOrder
  if (!Array.isArray(saved) || !saved.length) {
    return [...templateDefault]
  }

  const merged = saved.filter((id) => RESUME_SECTION_META.some((s) => s.id === id))
  templateDefault.forEach((id) => {
    if (!merged.includes(id)) merged.push(id)
  })
  return merged
}

export function getSectionVisibility(resumeInfo) {
  const raw =
    typeof resumeInfo?.sectionVisibility === 'object' && resumeInfo.sectionVisibility
      ? resumeInfo.sectionVisibility
      : {}
  return { ...DEFAULT_VISIBILITY, ...raw }
}

export function isSectionVisible(resumeInfo, sectionId) {
  return getSectionVisibility(resumeInfo)[sectionId] !== false
}

export function getOrderedVisibleSections(resumeInfo) {
  return getSectionOrder(resumeInfo).filter((id) => isSectionVisible(resumeInfo, id))
}

export function hasSectionContent(resumeInfo, sectionId) {
  if (!resumeInfo) return false

  switch (sectionId) {
    case 'summary':
      return Boolean(resumeInfo.summery?.trim())
    case 'experience':
      return (resumeInfo.experience ?? []).some(
        (e) => e?.title || e?.companyName || e?.workSummery,
      )
    case 'projects':
      return (resumeInfo.projects ?? []).some((p) => p?.name || p?.description)
    case 'education':
      return (resumeInfo.education ?? []).length > 0
    case 'skills':
      return (resumeInfo.skills ?? []).some(
        (s) => s?.title || (s?.skills && s.skills.length),
      )
    case 'customSections':
      return (resumeInfo.customSections ?? []).some(
        (s) => s?.title?.trim() || s?.content?.trim(),
      )
    default:
      return false
  }
}

export function normalizeSectionLayout(data = {}) {
  const templateDefault = getDefaultSectionOrder(data?.templateId)
  return {
    sectionOrder: getSectionOrder(data),
    sectionVisibility: {
      ...Object.fromEntries(templateDefault.map((id) => [id, true])),
      ...getSectionVisibility(data),
    },
  }
}

export function moveSectionInOrder(order, sectionId, direction) {
  const index = order.indexOf(sectionId)
  if (index < 0) return order
  const target = direction === 'up' ? index - 1 : index + 1
  if (target < 0 || target >= order.length) return order
  const next = [...order]
  ;[next[index], next[target]] = [next[target], next[index]]
  return next
}

export function setSectionVisible(visibility, sectionId, visible) {
  return { ...visibility, [sectionId]: visible }
}

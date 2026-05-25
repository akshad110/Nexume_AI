import { DEFAULT_THEME_COLOR } from '@/data/resumeThemes'
import { DEFAULT_TEMPLATE_ID } from '@/data/resumeTemplates'
import { getActiveBodySize, getActiveHeadingSize } from '@/data/resumeTypography'
import { normalizeSectionLayout } from '@/lib/resumeSectionLayout'
import { getSocialLink, unwrapStrapiEntity } from '@/lib/resumeLinks'

function normalizeSkills(data) {
  if (Array.isArray(data.skills) && data.skills.length) {
    return data.skills.map((item) => ({
      title: item.title || '',
      skills: Array.isArray(item.skills)
        ? item.skills
        : typeof item.skills === 'string'
          ? item.skills.split(',').map((s) => s.trim()).filter(Boolean)
          : [],
    }))
  }

  const ps = data.programmingSkills
  if (ps?.languages || ps?.technologies) {
    const migrated = []
    if (ps.languages) {
      migrated.push({
        title: 'Languages',
        skills: String(ps.languages)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      })
    }
    if (ps.technologies) {
      migrated.push({
        title: 'Technologies',
        skills: String(ps.technologies)
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
      })
    }
    return migrated
  }

  return []
}

export function normalizeResume(data) {
  if (!data) return data

  const flat = unwrapStrapiEntity(data)

  return {
    ...flat,
    templateId: flat.templateId || DEFAULT_TEMPLATE_ID,
    themeColor: flat.themeColor || DEFAULT_THEME_COLOR,
    headingFontSize: getActiveHeadingSize(flat),
    bodyFontSize: getActiveBodySize(flat),
    education: Array.isArray(flat.education) ? flat.education : [],
    experience: Array.isArray(flat.experience) ? flat.experience : [],
    skills: normalizeSkills(flat),
    projects: Array.isArray(flat.projects)
      ? flat.projects.map((p) => ({
          name: p.name || '',
          techUsed: p.techUsed || '',
          description: p.description || '',
        }))
      : [],
    website: flat.website || '',
    linkedin: getSocialLink(flat, 'linkedin'),
    github: getSocialLink(flat, 'github'),
    customSections: Array.isArray(flat.customSections) ? flat.customSections : [],
    ...normalizeSectionLayout(flat),
  }
}

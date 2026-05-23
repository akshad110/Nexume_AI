import { DEFAULT_THEME_COLOR } from '@/data/resumeThemes'
import { DEFAULT_TEMPLATE_ID } from '@/data/resumeTemplates'

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

  return {
    ...data,
    templateId: data.templateId || DEFAULT_TEMPLATE_ID,
    themeColor: data.themeColor || DEFAULT_THEME_COLOR,
    education: Array.isArray(data.education) ? data.education : [],
    experience: Array.isArray(data.experience) ? data.experience : [],
    skills: normalizeSkills(data),
    projects: Array.isArray(data.projects)
      ? data.projects.map((p) => ({
          name: p.name || '',
          techUsed: p.techUsed || '',
          description: p.description || '',
        }))
      : [],
    website: data.website || '',
    customSections: Array.isArray(data.customSections) ? data.customSections : [],
    sectionVisibility: {
      experience: true,
      ...(typeof data.sectionVisibility === 'object' && data.sectionVisibility
        ? data.sectionVisibility
        : {}),
    },
  }
}

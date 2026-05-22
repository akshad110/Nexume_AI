import { DEFAULT_THEME_COLOR } from '@/data/resumeThemes'
import { DEFAULT_TEMPLATE_ID } from '@/data/resumeTemplates'

export function normalizeResume(data) {
  if (!data) return data

  return {
    ...data,
    templateId: data.templateId || DEFAULT_TEMPLATE_ID,
    themeColor: data.themeColor || DEFAULT_THEME_COLOR,
    education: Array.isArray(data.education) ? data.education : [],
    experience: Array.isArray(data.experience) ? data.experience : [],
    skills: Array.isArray(data.skills) ? data.skills : [],
    projects: Array.isArray(data.projects) ? data.projects : [],
    programmingSkills: data.programmingSkills || {
      languages: '',
      technologies: '',
    },
    website: data.website || '',
  }
}

export const TEMPLATE_IDS = {
  CLASSIC: 'classic',
  PROFESSIONAL: 'professional',
  MODERN: 'modern',
}

export const RESUME_TEMPLATES = [
  {
    id: TEMPLATE_IDS.CLASSIC,
    name: 'Classic',
    description: 'Color accents · Summary · Skills · Projects',
    previewAccent: '#7c3aed',
  },
  {
    id: TEMPLATE_IDS.PROFESSIONAL,
    name: 'Professional (LaTeX)',
    description: 'ATS layout · Education · Experience · Projects · Programming Skills',
    previewAccent: '#171717',
  },
  {
    id: TEMPLATE_IDS.MODERN,
    name: 'Modern',
    description: 'Clean minimal · Summary · Experience · Education · Skills',
    previewAccent: '#0f172a',
  },
]

const FORM_STEPS_BY_TEMPLATE = {
  [TEMPLATE_IDS.CLASSIC]: [
    'personal',
    'summary',
    'experience',
    'projects',
    'education',
    'skills',
  ],
  [TEMPLATE_IDS.PROFESSIONAL]: [
    'personal',
    'education',
    'experience',
    'projects',
    'programmingSkills',
  ],
  [TEMPLATE_IDS.MODERN]: [
    'personal',
    'summary',
    'experience',
    'education',
    'skills',
  ],
}

export function getTemplateSteps(templateId) {
  return (
    FORM_STEPS_BY_TEMPLATE[templateId] ||
    FORM_STEPS_BY_TEMPLATE[TEMPLATE_IDS.CLASSIC]
  )
}

export function getStepCount(templateId) {
  return getTemplateSteps(templateId).length
}

export function getStepKey(templateId, stepIndex) {
  const steps = getTemplateSteps(templateId)
  return steps[stepIndex - 1] || steps[0]
}

export function isProfessionalTemplate(templateId) {
  return templateId === TEMPLATE_IDS.PROFESSIONAL
}

export function isModernTemplate(templateId) {
  return templateId === TEMPLATE_IDS.MODERN
}

export function isClassicTemplate(templateId) {
  return !templateId || templateId === TEMPLATE_IDS.CLASSIC
}

export function getTemplateMeta(templateId) {
  return (
    RESUME_TEMPLATES.find((t) => t.id === templateId) ||
    RESUME_TEMPLATES[0]
  )
}

export const DEFAULT_TEMPLATE_ID = TEMPLATE_IDS.CLASSIC

export const STEP_LABELS = {
  personal: 'Personal Details',
  summary: 'Summary',
  experience: 'Professional Experience',
  projects: 'Projects',
  education: 'Education',
  skills: 'Skills',
  programmingSkills: 'Programming Skills',
}

export function getStepLabel(stepKey) {
  return STEP_LABELS[stepKey] || stepKey
}

export const TEMPLATE_IDS = {
  CLASSIC: 'classic',
  PROFESSIONAL: 'professional',
  MODERN: 'modern',
}

/** Matches template1.tex — sans-serif, experience → projects → education → skills */
export const RESUME_TEMPLATES = [
  {
    id: TEMPLATE_IDS.CLASSIC,
    name: 'Classic',
    description: 'Template 1 · Experience · Projects · Education · Skills',
    previewAccent: '#7c3aed',
  },
  {
    id: TEMPLATE_IDS.PROFESSIONAL,
    name: 'Professional',
    description: 'Template 2 · Education · Skills table · Projects · Experience',
    previewAccent: '#171717',
  },
  {
    id: TEMPLATE_IDS.MODERN,
    name: 'Modern',
    description: 'Template 3 · Summary · Experience · Projects · Education · Skills',
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
    'customSections',
  ],
  [TEMPLATE_IDS.PROFESSIONAL]: [
    'personal',
    'education',
    'experience',
    'projects',
    'skills',
    'customSections',
  ],
  [TEMPLATE_IDS.MODERN]: [
    'personal',
    'summary',
    'experience',
    'projects',
    'education',
    'skills',
    'customSections',
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
  customSections: 'Custom Sections',
}

export function getStepLabel(stepKey) {
  return STEP_LABELS[stepKey] || stepKey
}

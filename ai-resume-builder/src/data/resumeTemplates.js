export const TEMPLATE_IDS = {
  CLASSIC: 'classic',
  PROFESSIONAL: 'professional',
  MODERN: 'modern',
  DATA_SCIENCE: 'dataScience',
  DEVELOPER: 'developer',
  SIDEBAR: 'sidebar',
}

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
    description: 'Template 2 · Education · Skills · Projects · Experience',
    previewAccent: '#171717',
  },
  {
    id: TEMPLATE_IDS.MODERN,
    name: 'Modern',
    description: 'Template 3 · Summary · Experience · Projects · Education',
    previewAccent: '#0f172a',
  },
  {
    id: TEMPLATE_IDS.DATA_SCIENCE,
    name: 'Data Science',
    description: 'Template 4 · Objective · Skills · Experience · Education',
    previewAccent: '#2563eb',
  },
  {
    id: TEMPLATE_IDS.DEVELOPER,
    name: 'Developer',
    description: 'Template 5 · Summary · Skills · Experience · Education · Projects',
    previewAccent: '#2563eb',
  },
  {
    id: TEMPLATE_IDS.SIDEBAR,
    name: 'Sidebar',
    description: 'Template 6 · Two-column · Skills · Education · Experience',
    previewAccent: '#1f2937',
  },
]

/** Default section order per LaTeX template structure */
export const DEFAULT_SECTION_ORDER_BY_TEMPLATE = {
  [TEMPLATE_IDS.CLASSIC]: [
    'summary',
    'experience',
    'projects',
    'education',
    'skills',
    'customSections',
  ],
  [TEMPLATE_IDS.PROFESSIONAL]: [
    'summary',
    'education',
    'skills',
    'projects',
    'experience',
    'customSections',
  ],
  [TEMPLATE_IDS.MODERN]: [
    'summary',
    'experience',
    'projects',
    'education',
    'skills',
    'customSections',
  ],
  [TEMPLATE_IDS.DATA_SCIENCE]: [
    'summary',
    'skills',
    'experience',
    'education',
    'customSections',
  ],
  [TEMPLATE_IDS.DEVELOPER]: [
    'summary',
    'skills',
    'experience',
    'education',
    'projects',
    'customSections',
  ],
  [TEMPLATE_IDS.SIDEBAR]: [
    'experience',
    'projects',
    'customSections',
  ],
}

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
  [TEMPLATE_IDS.DATA_SCIENCE]: [
    'personal',
    'summary',
    'skills',
    'experience',
    'education',
    'customSections',
  ],
  [TEMPLATE_IDS.DEVELOPER]: [
    'personal',
    'summary',
    'skills',
    'experience',
    'education',
    'projects',
    'customSections',
  ],
  [TEMPLATE_IDS.SIDEBAR]: [
    'personal',
    'skills',
    'education',
    'experience',
    'projects',
    'customSections',
  ],
}

export function getDefaultSectionOrder(templateId) {
  return (
    DEFAULT_SECTION_ORDER_BY_TEMPLATE[templateId] ||
    DEFAULT_SECTION_ORDER_BY_TEMPLATE[TEMPLATE_IDS.CLASSIC]
  )
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

export function isDataScienceTemplate(templateId) {
  return templateId === TEMPLATE_IDS.DATA_SCIENCE
}

export function isDeveloperTemplate(templateId) {
  return templateId === TEMPLATE_IDS.DEVELOPER
}

export function isSidebarTemplate(templateId) {
  return templateId === TEMPLATE_IDS.SIDEBAR
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
  summary: 'Summary / Objective',
  experience: 'Professional Experience',
  projects: 'Projects',
  education: 'Education',
  skills: 'Skills',
  customSections: 'Custom Sections',
}

export function getStepLabel(stepKey) {
  return STEP_LABELS[stepKey] || stepKey
}

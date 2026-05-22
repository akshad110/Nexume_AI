import { getStepCount, getStepKey } from '@/data/resumeTemplates'

export function parseFormStep(searchParams, templateId) {
  const max = getStepCount(templateId)
  const step = parseInt(searchParams.get('step') || '1', 10)
  if (Number.isNaN(step) || step < 1) return 1
  if (step > max) return max
  return step
}

export function isPersonalDetailComplete(resumeInfo) {
  return !!(
    resumeInfo?.firstName &&
    resumeInfo?.lastName &&
    resumeInfo?.jobTitle &&
    resumeInfo?.email
  )
}

export function canEnableNextForStep(step, resumeInfo, templateId) {
  if (!resumeInfo) return false
  const stepKey = getStepKey(templateId, step)

  if (stepKey === 'personal') {
    return isPersonalDetailComplete(resumeInfo)
  }

  if (step > 1) return true
  return false
}

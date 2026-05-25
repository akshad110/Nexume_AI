import { DEFAULT_TEMPLATE_ID } from '@/data/resumeTemplates'
import { DEFAULT_THEME_COLOR } from '@/data/resumeThemes'
import {
  DEFAULT_BODY_FONT_SIZE,
  DEFAULT_HEADING_FONT_SIZE,
} from '@/data/resumeTypography'
import { normalizeSectionLayout } from '@/lib/resumeSectionLayout'

export function buildResumeGenerationPrompt({
  userPrompt,
  fileText = '',
  templateId = DEFAULT_TEMPLATE_ID,
}) {
  const contextBlock = fileText
    ? `\n\nExtracted text from uploaded file(s):\n"""\n${fileText.slice(0, 12000)}\n"""`
    : ''

  return `You are an expert resume writer. Create a complete, professional resume as JSON only.

User request:
"""
${userPrompt}
"""
${contextBlock}

Template style hint: ${templateId} (classic | professional | modern | dataScience | developer | sidebar).

Return ONE JSON object (no markdown) matching this schema:
{
  "title": "short resume title string",
  "firstName": "string",
  "lastName": "string",
  "jobTitle": "string",
  "address": "string",
  "phone": "string",
  "email": "string",
  "website": "string (optional)",
  "linkedin": "string (optional LinkedIn profile URL)",
  "github": "string (optional GitHub profile URL)",
  "summery": "plain text professional summary paragraph",
  "education": [
    {
      "universityName": "string",
      "degree": "string",
      "major": "string",
      "startDate": "string",
      "endDate": "string",
      "description": "string"
    }
  ],
  "experience": [
    {
      "title": "string",
      "companyName": "string",
      "city": "string",
      "state": "string",
      "startDate": "string",
      "endDate": "string",
      "currenlyworking": false,
      "workSummery": "HTML string with <ul><li>bullet points</li></ul> for achievements"
    }
  ],
  "skills": [
    { "title": "Languages|Frontend|Tools etc", "skills": ["skill1", "skill2"] }
  ],
  "projects": [
    { "name": "string", "techUsed": "string", "description": "string" }
  ],
  "customSections": [],
  "sectionVisibility": { "experience": true }
}

Rules:
- Use realistic placeholders only if user gave no data.
- workSummery must be valid simple HTML lists where applicable.
- skills.skills must be arrays of strings.
- Keep content concise and ATS-friendly.
- At least 1 experience entry and 1 education entry if possible.`
}

export function normalizeAiResumeData(raw, { templateId, userEmail, userName }) {
  const data = raw?.resume && typeof raw.resume === 'object' ? raw.resume : raw

  return {
    title: String(data?.title || 'AI Resume').trim() || 'AI Resume',
    firstName: String(data?.firstName || '').trim(),
    lastName: String(data?.lastName || '').trim(),
    jobTitle: String(data?.jobTitle || '').trim(),
    address: String(data?.address || '').trim(),
    phone: String(data?.phone || '').trim(),
    email: String(data?.email || userEmail || '').trim(),
    website: String(data?.website || '').trim(),
    linkedin: String(data?.linkedin || '').trim(),
    github: String(data?.github || '').trim(),
    summery: String(data?.summery || '').trim(),
    templateId: data?.templateId || templateId || DEFAULT_TEMPLATE_ID,
    themeColor: data?.themeColor || DEFAULT_THEME_COLOR,
    headingFontSize: Number(data?.headingFontSize) || DEFAULT_HEADING_FONT_SIZE,
    bodyFontSize: Number(data?.bodyFontSize) || DEFAULT_BODY_FONT_SIZE,
    education: Array.isArray(data?.education) ? data.education : [],
    experience: Array.isArray(data?.experience) ? data.experience : [],
    skills: Array.isArray(data?.skills) ? data.skills : [],
    projects: Array.isArray(data?.projects) ? data.projects : [],
    customSections: Array.isArray(data?.customSections)
      ? data.customSections
          .map((section) => ({
            title: String(section?.title ?? '').trim(),
            content: String(section?.content ?? '').trim(),
          }))
          .filter((section) => section.title || section.content)
      : [],
    programmingSkills: { languages: '', technologies: '' },
    ...normalizeSectionLayout(data),
    userEmail: userEmail || '',
    userName: userName || '',
  }
}

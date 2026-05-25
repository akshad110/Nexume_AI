import { generateAIWithParts } from './AIModal'
import { buildResumeGenerationPrompt, normalizeAiResumeData } from '@/lib/aiResumeSchema'
import { extractResumeFileText } from '@/lib/extractResumeFileText'
import { normalizeResume } from '@/lib/normalizeResume'

async function fileToInlinePart(file) {
  const buffer = await file.arrayBuffer()
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i])
  }
  return {
    inlineData: {
      mimeType: file.type || 'application/octet-stream',
      data: btoa(binary),
    },
  }
}

export async function generateResumeFromAI({
  prompt,
  files = [],
  templateId,
  userEmail,
  userName,
}) {
  const trimmed = (prompt || '').trim()
  if (!trimmed && files.length === 0) {
    throw new Error('Enter a prompt or attach a PDF/image.')
  }

  const textParts = []
  const imageParts = []

  for (const file of files) {
    if (file.type?.startsWith('image/')) {
      imageParts.push(await fileToInlinePart(file))
    } else {
      const extracted = await extractResumeFileText(file)
      if (extracted) {
        textParts.push(`--- ${file.name} ---\n${extracted}`)
      }
    }
  }

  const combinedFileText = textParts.join('\n\n')
  const aiPrompt = buildResumeGenerationPrompt({
    userPrompt: trimmed || 'Build a resume from the attached file(s).',
    fileText: combinedFileText,
    templateId,
  })

  const parts = [
    ...imageParts,
    {
      text:
        imageParts.length > 0
          ? `${aiPrompt}\n\nAlso analyze the attached image(s) for resume content.`
          : aiPrompt,
    },
  ]

  const raw = await generateAIWithParts(parts)
  const merged = normalizeAiResumeData(raw, { templateId, userEmail, userName })
  return normalizeResume(merged)
}

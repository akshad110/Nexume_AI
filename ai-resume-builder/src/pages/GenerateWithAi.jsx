import React, { useCallback, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/react'
import { v4 as uuidv4 } from 'uuid'
import {
  Download,
  FileImage,
  FileText,
  Loader2,
  Paperclip,
  Save,
  X,
} from 'lucide-react'
import { toast } from 'sonner'
import ChatGPTInput from '@/components/ui/prompt-input-dynamic-grow'
import { Button } from '@/components/ui/button'
import ResumePreview from '@/Dashboard/resume/component/ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeContext'
import {
  RESUME_TEMPLATES,
  DEFAULT_TEMPLATE_ID,
} from '@/data/resumeTemplates'
import { generateResumeFromAI } from '../../service/generateResumeFromAI'
import GlobalApis from '../../service/GlobalApis'
import { downloadResumePdf, getSafeFileName } from '@/lib/downloadResumePdf'
import { cn } from '@/lib/utils'
import SectionLayoutPicker from '@/Dashboard/resume/component/SectionLayoutPicker'

function GenerateWithAi() {
  const { user } = useUser()
  const fileInputRef = useRef(null)

  const [templateId, setTemplateId] = useState(DEFAULT_TEMPLATE_ID)
  const [resumeInfo, setResumeInfo] = useState(null)
  const [messages, setMessages] = useState([])
  const [attachedFiles, setAttachedFiles] = useState([])
  const [generating, setGenerating] = useState(false)
  const [saving, setSaving] = useState(false)
  const [downloading, setDownloading] = useState(false)
  const [documentId, setDocumentId] = useState(null)

  const addMessage = (role, text) => {
    setMessages((prev) => [...prev, { id: Date.now() + Math.random(), role, text }])
  }

  const onFilesPicked = (e) => {
    const list = Array.from(e.target.files || [])
    if (!list.length) return
    setAttachedFiles((prev) => {
      const merged = [...prev]
      list.forEach((file) => {
        if (!merged.some((f) => f.name === file.name && f.size === file.size)) {
          merged.push(file)
        }
      })
      return merged.slice(0, 5)
    })
    e.target.value = ''
  }

  const removeFile = (index) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleGenerate = useCallback(
    async (promptText) => {
      if (!import.meta.env.VITE_GOOGLE_AI_API_KEY) {
        toast.error('Add VITE_GOOGLE_AI_API_KEY to .env.local')
        return
      }

      setGenerating(true)
      addMessage('user', promptText)
      if (attachedFiles.length) {
        addMessage(
          'user',
          `Attached: ${attachedFiles.map((f) => f.name).join(', ')}`,
        )
      }

      try {
        const generated = await generateResumeFromAI({
          prompt: promptText,
          files: attachedFiles,
          templateId,
          userEmail: user?.primaryEmailAddress?.emailAddress,
          userName: user?.fullName,
        })

        const withMeta = {
          ...generated,
          templateId,
          resumeid: generated.resumeid || uuidv4(),
        }

        setResumeInfo(withMeta)
        setAttachedFiles([])
        addMessage(
          'assistant',
          'Resume generated. Preview updated on the right — save to your dashboard or download PDF.',
        )
        toast.success('Resume generated')
      } catch (err) {
        console.error(err)
        addMessage('assistant', err?.message || 'Generation failed.')
        toast.error(err?.message || 'Failed to generate resume')
      } finally {
        setGenerating(false)
      }
    },
    [attachedFiles, templateId, user],
  )

  const handleSave = async () => {
    if (!resumeInfo) return
    setSaving(true)
    try {
      const payload = {
        data: {
          ...resumeInfo,
          resumeid: resumeInfo.resumeid || uuidv4(),
        },
      }

      if (documentId) {
        await GlobalApis.UpdateResumeInfo(documentId, payload)
        toast.success('Resume updated')
      } else {
        const res = await GlobalApis.CreateNewResume(payload)
        const id = res?.data?.data?.documentId
        if (id) {
          setDocumentId(id)
          toast.success('Saved to dashboard')
        }
      }
    } catch (err) {
      toast.error(err?.message || 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = async () => {
    if (!resumeInfo) return
    setDownloading(true)
    try {
      await downloadResumePdf(resumeInfo, getSafeFileName(resumeInfo.title))
      toast.success('PDF downloaded')
    } catch (err) {
      toast.error(err?.message || 'Download failed')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="flex min-h-[calc(100vh-60px)] flex-col lg:flex-row">
      <div className="flex min-h-0 flex-1 flex-col border-b border-gray-200 lg:border-b-0 lg:border-r">
        <div className="border-b border-gray-100 px-5 py-4">
          <div>
            <h1 className="text-lg font-bold text-gray-900">Generate with AI</h1>
            <p className="text-xs text-gray-500">
              Prompt, PDF, or image → structured resume (Gemini)
            </p>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {RESUME_TEMPLATES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  setTemplateId(t.id)
                  if (resumeInfo) {
                    setResumeInfo((prev) => ({ ...prev, templateId: t.id }))
                  }
                }}
                className={cn(
                  'rounded-full border px-3 py-1 text-xs font-semibold transition-colors',
                  templateId === t.id
                    ? 'border-gray-900 bg-gray-900 text-white'
                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-400',
                )}
              >
                {t.name}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
          {messages.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50/80 p-6 text-center text-sm text-gray-500">
              <p>
                Example: &quot;Software engineer with 3 years React and Node.
                Targeting fintech roles in NYC.&quot;
              </p>
              <p className="mt-2 text-xs">
                Attach an old resume PDF or screenshot for better results.
              </p>
            </div>
          ) : (
            <ul className="space-y-3">
              {messages.map((msg) => (
                <li
                  key={msg.id}
                  className={cn(
                    'max-w-[90%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed',
                    msg.role === 'user'
                      ? 'ml-auto bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-800',
                  )}
                >
                  {msg.text}
                </li>
              ))}
              {generating ? (
                <li className="flex items-center gap-2 text-sm text-gray-500">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Generating resume…
                </li>
              ) : null}
            </ul>
          )}
        </div>

        <div className="border-t border-gray-100 bg-white/80 px-4 py-4 backdrop-blur">
          {attachedFiles.length > 0 ? (
            <div className="mb-3 flex flex-wrap gap-2">
              {attachedFiles.map((file, index) => (
                <span
                  key={`${file.name}-${index}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs text-gray-700"
                >
                  {file.type?.startsWith('image/') ? (
                    <FileImage className="h-3.5 w-3.5" />
                  ) : (
                    <FileText className="h-3.5 w-3.5" />
                  )}
                  <span className="max-w-[140px] truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="text-gray-400 hover:text-gray-700"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </span>
              ))}
            </div>
          ) : null}

          <div className="mb-2 flex items-center gap-2">
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.txt,image/png,image/jpeg,image/webp,image/gif"
              onChange={onFilesPicked}
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="gap-1.5"
              disabled={generating}
              onClick={() => fileInputRef.current?.click()}
            >
              <Paperclip className="h-4 w-4" />
              PDF or image
            </Button>
          </div>

          <ChatGPTInput
            placeholder="Describe your experience, target role, or paste a job description…"
            onSubmit={handleGenerate}
            disabled={generating}
            showEffects
            expandOnFocus={false}
            className="w-full"
          />
        </div>
      </div>

      <div className="flex min-h-[50vh] flex-1 flex-col bg-gray-50/50 lg:min-h-0">
        {resumeInfo ? (
          <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
            <PreviewPanel
              documentId={documentId}
              saving={saving}
              downloading={downloading}
              onSave={handleSave}
              onDownload={handleDownload}
            />
          </ResumeInfoContext.Provider>
        ) : (
          <EmptyPreviewPanel />
        )}
        {documentId ? (
          <div className="border-t border-gray-100 px-5 py-3 text-center">
            <Link
              to={`/dashboard/resume/${documentId}/edit?step=1`}
              className="text-sm font-medium text-violet-600 hover:underline"
            >
              Open in full editor →
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  )
}

function EmptyPreviewPanel() {
  return (
    <div className="min-h-0 flex-1 overflow-auto p-5">
      <div className="flex h-full min-h-[280px] flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white p-8 text-center text-sm text-gray-500">
        <p>Your generated resume will appear here.</p>
        <Link to="/dashboard" className="mt-4 text-violet-600 hover:underline">
          Or open dashboard to edit manually
        </Link>
      </div>
    </div>
  )
}

function PreviewPanel({
  documentId,
  saving,
  downloading,
  onSave,
  onDownload,
}) {
  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-gray-100 px-5 py-3">
        <p className="text-sm font-semibold text-gray-900">Live preview</p>
        <div className="flex flex-wrap items-center gap-2">
          <SectionLayoutPicker documentId={documentId} />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-1.5"
            disabled={saving}
            onClick={onSave}
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save
          </Button>
          <Button
            type="button"
            size="sm"
            className="gap-1.5"
            disabled={downloading}
            onClick={onDownload}
          >
            {downloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Download PDF
          </Button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-auto p-5">
        <div className="mx-auto max-w-[210mm] rounded-xl border border-gray-200 bg-white shadow-sm">
          <ResumePreview />
        </div>
      </div>
    </>
  )
}

export default GenerateWithAi

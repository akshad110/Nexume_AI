import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Textarea } from '@/components/ui/textarea'
import { toast } from 'sonner'
import { analyzeResumeWithAts } from '@/service/atsApi'
import { extractResumeFileText } from '@/lib/extractResumeFileText'
import { parseAtsAnalysis } from '@/lib/parseAtsAnalysis'
import AtsScoreCard from '@/components/ats/AtsScoreCard'
import AtsResultSection from '@/components/ats/AtsResultSection'
import ScrollReveal from '@/components/landing/ScrollReveal'
import { MockAtsPanel } from '@/components/landing/mock/LandingMocks'
import { cn } from '@/lib/utils'

const ACCEPTED_TYPES = {
  'application/pdf': 'PDF',
  'text/plain': 'TXT',
}

const MAX_FILE_MB = 10

const TIPS = [
  { title: 'Paste the full job ad', desc: 'Include requirements & nice-to-haves' },
  { title: 'Use Check ATS in editor', desc: 'Best results — or upload a freshly downloaded PDF' },
  { title: 'Under a minute', desc: 'First run may take longer on cold start' },
]

function AtsChecker() {
  const location = useLocation()
  const fileInputRef = useRef(null)
  const [jobDescription, setJobDescription] = useState('')
  const [resumeFile, setResumeFile] = useState(null)
  const [resumeText, setResumeText] = useState(null)
  const [fromBuilder, setFromBuilder] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [result, setResult] = useState(null)
  const [showResults, setShowResults] = useState(false)

  const parsed = useMemo(
    () => (result ? parseAtsAnalysis(result.analysis) : null),
    [result],
  )

  const loadingMessages = [
    'Sending job posting & resume…',
    'Extracting text from your file…',
    'Running keyword comparison…',
    'Building your report…',
  ]

  const isAcceptedResumeFile = (file) => {
    if (!file) return false
    if (ACCEPTED_TYPES[file.type]) return true
    const name = (file.name || '').toLowerCase()
    return name.endsWith('.pdf') || name.endsWith('.txt')
  }

  const validateFile = (file) => {
    if (!file) return false
    if (!isAcceptedResumeFile(file)) {
      toast.error('Please upload a PDF or TXT file')
      return false
    }
    if (!file.size || file.size > MAX_FILE_MB * 1024 * 1024) {
      toast.error(
        file.size
          ? `File must be under ${MAX_FILE_MB}MB`
          : 'Could not read file size — try saving the PDF again or use TXT',
      )
      return false
    }
    return true
  }

  useEffect(() => {
    const state = location.state
    if (!state?.resumeFile && !state?.resumeText) return

    if (state.resumeFile && validateFile(state.resumeFile)) {
      setResumeFile(state.resumeFile)
    }
    if (state.resumeText) {
      setResumeText(state.resumeText)
    }
    if (state.fromBuilder) {
      setFromBuilder(true)
    }
    window.history.replaceState({}, document.title)
  }, [location.state])

  const handleFile = (file) => {
    if (validateFile(file)) {
      setResumeFile(file)
      setResumeText(null)
      setFromBuilder(false)
      setResult(null)
      setShowResults(false)
    }
  }

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files?.[0])
  }, [])

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      toast.error('Paste the job description first')
      return
    }
    if (!resumeFile && !resumeText) {
      toast.error('Upload your resume (PDF or TXT)')
      return
    }

    setLoading(true)
    setLoadingProgress(8)
    setResult(null)
    setShowResults(false)

    const progressTimer = setInterval(() => {
      setLoadingProgress((p) => Math.min(p + 6, 92))
    }, 2200)

    try {
      let textPayload = resumeText?.trim() || ''

      if (!textPayload && resumeFile) {
        textPayload = await extractResumeFileText(resumeFile)
      }

      if (!textPayload) {
        toast.error(
          'Could not read text from this PDF. Use Check ATS score from the resume editor, or re-download your resume and try again.',
        )
        setLoading(false)
        setLoadingProgress(0)
        return
      }

      const data = await analyzeResumeWithAts({
        jobDescription: jobDescription.trim(),
        resumeText: textPayload,
      })
      setLoadingProgress(100)
      setResult(data)
      setShowResults(true)
      toast.success('Report ready')
    } catch (err) {
      toast.error(err.message || 'Failed to analyze resume')
    } finally {
      clearInterval(progressTimer)
      setLoading(false)
      setLoadingProgress(0)
    }
  }

  const reset = () => {
    setResult(null)
    setShowResults(false)
    setResumeFile(null)
    setResumeText(null)
    setFromBuilder(false)
    setJobDescription('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const loadingMsgIndex = Math.min(
    Math.floor(loadingProgress / 25),
    loadingMessages.length - 1,
  )

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#fafafa] overflow-x-hidden">
      {/* Hero */}
      <section className="relative border-b border-gray-200/80 bg-white overflow-hidden">
        <div
          className="pointer-events-none absolute -top-24 right-0 w-[min(600px,80vw)] h-[320px] rounded-full opacity-50 blur-3xl"
          style={{
            background:
              'radial-gradient(ellipse, rgba(159, 91, 255, 0.25) 0%, rgba(56, 189, 248, 0.15) 50%, transparent 70%)',
          }}
        />
        <div className="relative mx-auto max-w-6xl px-5 py-10 md:py-14">
          <ScrollReveal>
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-200/80 bg-violet-50/80 px-4 py-1.5 text-sm mb-5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-500" />
              </span>
              <span className="font-semibold text-violet-900">ATS intelligence</span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={80}>
            <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-gray-900 tracking-tight leading-[1.1] max-w-3xl">
              See how your resume stacks up against the{' '}
              <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
                job post
              </span>
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={160}>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl leading-relaxed">
              Paste the listing, attach your CV, and get a match score with keyword
              gaps and fixes — before you hit apply.
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 py-10 md:py-14">
        <div
          className={cn(
            'grid gap-8 lg:gap-10 items-start',
            showResults
              ? 'lg:grid-cols-[minmax(0,400px)_1fr]'
              : 'lg:grid-cols-[minmax(0,420px)_1fr]',
          )}
        >
          {/* Input card */}
          <ScrollReveal className={cn(showResults && 'lg:sticky lg:top-20')}>
            <aside className="rounded-[2rem] border border-gray-200/80 bg-white/90 backdrop-blur-md shadow-[0_16px_50px_-20px_rgba(0,0,0,0.12)] overflow-hidden">
              <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
                  Your inputs
                </p>
              </div>

              <div className="p-6 space-y-8">
                <fieldset className="space-y-3">
                  <legend className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-[11px] font-black text-white">
                      1
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      Job posting
                    </span>
                  </legend>
                  <Textarea
                    placeholder="Copy everything from the job ad — role, requirements, nice-to-haves…"
                    className="min-h-[140px] resize-y text-[15px] rounded-xl border-gray-200 bg-gray-50/80 focus:bg-white focus:border-violet-300 focus:ring-violet-200/50"
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    disabled={loading}
                  />
                  <p className="text-xs text-gray-400 font-medium">
                    {jobDescription.length > 0
                      ? `${jobDescription.length.toLocaleString()} characters`
                      : 'More detail = sharper feedback'}
                  </p>
                </fieldset>

                <fieldset className="space-y-3">
                  <legend className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-600 to-fuchsia-500 text-[11px] font-black text-white">
                      2
                    </span>
                    <span className="text-sm font-bold text-gray-900">
                      Resume file
                    </span>
                  </legend>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.txt,application/pdf,text/plain"
                    className="hidden"
                    onChange={(e) => handleFile(e.target.files?.[0])}
                  />

                  {!resumeFile ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      onDragOver={(e) => {
                        e.preventDefault()
                        setDragOver(true)
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={onDrop}
                      disabled={loading}
                      className={cn(
                        'w-full rounded-2xl border-2 border-dashed p-8 text-center transition-all duration-200',
                        dragOver
                          ? 'border-violet-500 bg-violet-50/50 scale-[1.01]'
                          : 'border-gray-200 bg-gradient-to-b from-gray-50/80 to-white hover:border-violet-300 hover:shadow-md',
                        loading && 'opacity-50 pointer-events-none',
                      )}
                    >
                      <p className="font-bold text-gray-900">Drop your resume here</p>
                      <p className="text-sm text-gray-500 mt-2">
                        PDF or TXT · max {MAX_FILE_MB} MB
                      </p>
                    </button>
                  ) : (
                    <div className="flex items-center gap-4 rounded-2xl border border-violet-200/60 bg-gradient-to-r from-violet-50/50 to-white p-4">
                      <div className="shrink-0 h-12 w-10 rounded-lg border border-gray-200 bg-white flex items-center justify-center shadow-sm">
                        <span className="text-[10px] font-black text-violet-700">
                          {ACCEPTED_TYPES[resumeFile.type] ||
                            (resumeFile.name?.toLowerCase().endsWith('.pdf')
                              ? 'PDF'
                              : 'TXT')}
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-gray-900 truncate">
                          {resumeFile.name}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5 font-mono">
                          {(resumeFile.size / 1024).toFixed(1)} KB
                          {fromBuilder && (
                            <span className="ml-2 text-violet-600 font-sans font-semibold">
                              · from your resume (text)
                            </span>
                          )}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          setResumeFile(null)
                          if (fileInputRef.current) fileInputRef.current.value = ''
                        }}
                        className="text-xs font-bold text-gray-500 hover:text-red-600 transition-colors"
                        disabled={loading}
                      >
                        Remove
                      </button>
                    </div>
                  )}
                </fieldset>

                {loading && (
                  <div className="rounded-2xl bg-gray-50 border border-gray-100 p-4 space-y-3">
                    <div className="h-2 w-full rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 transition-all duration-500 ease-out"
                        style={{ width: `${loadingProgress}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600 font-medium flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-violet-600 shrink-0" />
                      {loadingMessages[loadingMsgIndex]}
                    </p>
                  </div>
                )}

                <div className="space-y-2 pt-1">
                  <button
                    type="button"
                    onClick={handleAnalyze}
                    disabled={loading}
                    className="w-full rounded-2xl bg-gray-900 text-white font-bold text-sm py-4 hover:bg-gray-800 shadow-lg shadow-gray-900/20 transition-all hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Running scan…
                      </span>
                    ) : (
                      'Run ATS scan'
                    )}
                  </button>
                  {(result || resumeFile || jobDescription) && (
                    <button
                      type="button"
                      onClick={reset}
                      disabled={loading}
                      className="w-full text-sm text-gray-500 hover:text-gray-900 font-semibold py-2"
                    >
                      Start over
                    </button>
                  )}
                </div>
              </div>
            </aside>
          </ScrollReveal>

          {/* Results or preview */}
          {showResults && parsed ? (
            <div
              className={cn(
                'space-y-5 min-w-0 transition-all duration-700',
                'opacity-100 translate-y-0',
              )}
            >
              <AtsScoreCard score={parsed.score} />

              {parsed.score == null && (
                <ScrollReveal>
                  <p className="text-sm text-gray-500 rounded-2xl border border-gray-200 bg-white px-5 py-4">
                    Couldn&apos;t parse a numeric score — see the detailed sections
                    below.
                  </p>
                </ScrollReveal>
              )}

              <div className="space-y-4">
                {parsed.sections.map((section, i) => (
                  <AtsResultSection
                    key={`${section.key}-${i}`}
                    section={section}
                    index={i}
                  />
                ))}
              </div>

              <p className="text-xs text-gray-400 text-center py-4">
                Suggestions only — always review before applying.
              </p>
            </div>
          ) : (
            !loading && (
              <div className="space-y-6">
                <ScrollReveal delay={100} className="hidden lg:block">
                  <div className="relative rounded-[2rem] border border-white/60 bg-white/50 backdrop-blur p-8 shadow-[0_24px_60px_-20px_rgba(99,102,241,0.2)]">
                    <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-tr from-violet-100/40 to-cyan-100/30" />
                    <div className="relative">
                      <MockAtsPanel />
                    </div>
                  </div>
                </ScrollReveal>

                <ScrollReveal delay={180}>
                  <div className="rounded-[1.75rem] border border-gray-200/80 bg-white p-6 md:p-8 shadow-sm">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      Your report appears here
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-6">
                      Match score, missing keywords, role fit, and concrete edits —
                      generated from your job post and resume.
                    </p>
                    <div className="grid sm:grid-cols-3 gap-4">
                      {TIPS.map((tip, i) => (
                        <div
                          key={tip.title}
                          className="rounded-xl bg-gradient-to-b from-gray-50 to-white border border-gray-100 p-4 hover:border-violet-200 transition-colors"
                        >
                          <span className="text-[10px] font-black text-violet-500">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <p className="mt-2 text-sm font-bold text-gray-900">
                            {tip.title}
                          </p>
                          <p className="mt-1 text-xs text-gray-500">{tip.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollReveal>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  )
}

export default AtsChecker

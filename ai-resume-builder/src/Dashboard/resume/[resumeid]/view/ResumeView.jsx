import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, Download, Loader2 } from 'lucide-react'
import ResumePreview from '../../component/ResumePreview'
import { ResumeInfoContext } from '@/context/ResumeContext'
import GlobalApis from '../../../../../service/GlobalApis'
import { Button } from '@/components/ui/button'
import { downloadResumePdf, getSafeFileName } from '@/lib/downloadResumePdf'
import { resumeToPlainText, resumeToTextFile } from '@/lib/resumeToPlainText'
import { toast } from 'sonner'
import { normalizeResume } from '@/lib/normalizeResume'

function ResumeView() {
  const { resumeid } = useParams()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const previewRef = useRef(null)
  const autoDownloadDone = useRef(false)
  const [resumeInfo, setResumeInfo] = useState()
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(false)

  const autoDownload = searchParams.get('download') === 'true'

  useEffect(() => {
    setLoading(true)
    GlobalApis.GetResumeById(resumeid)
      .then((res) => {
        setResumeInfo(normalizeResume(res.data.data))
      })
      .catch(() => {
        toast.error('Failed to load resume')
      })
      .finally(() => setLoading(false))
  }, [resumeid])

  const handleCheckAts = useCallback(() => {
    if (!resumeInfo) return
    const text = resumeToPlainText(resumeInfo)
    const file = resumeToTextFile(resumeInfo, resumeInfo.title || 'resume')
    navigate('/ats-checker', {
      state: { resumeFile: file, resumeText: text, fromBuilder: true },
    })
  }, [resumeInfo, navigate])

  const handleDownload = useCallback(async (redirectAfter = false) => {
    if (!resumeInfo) {
      toast.error('Resume is not loaded yet')
      return
    }

    setDownloading(true)
    try {
      const fileName = getSafeFileName(resumeInfo?.title)
      await downloadResumePdf(resumeInfo, fileName)
      toast.success('Resume downloaded')
      if (redirectAfter) {
        navigate('/dashboard', { replace: true })
      }
    } catch (err) {
      console.error('PDF download failed:', err)
      toast.error(err?.message || 'Failed to download resume')
    } finally {
      setDownloading(false)
    }
  }, [resumeInfo, navigate])

  useEffect(() => {
    if (!loading && resumeInfo && autoDownload && !autoDownloadDone.current) {
      autoDownloadDone.current = true
      const timer = setTimeout(() => handleDownload(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [loading, resumeInfo, autoDownload, handleDownload])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <ResumeInfoContext.Provider value={{ resumeInfo, setResumeInfo }}>
      <div className="p-6 md:p-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6 gap-2 flex-wrap">
          <Link to="/dashboard">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex gap-2 flex-wrap">
            <Button
              variant="outline"
              className="gap-2"
              onClick={handleCheckAts}
            >
              Check ATS score
            </Button>
            <Button
              variant="outline"
              className="gap-2"
              onClick={() => handleDownload(false)}
              disabled={downloading}
            >
              {downloading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Download PDF
            </Button>
            <Link to={`/dashboard/resume/${resumeid}/edit`}>
              <Button>Edit Resume</Button>
            </Link>
          </div>
        </div>

        <h1 className="text-2xl font-semibold mb-6">
          {resumeInfo?.title || 'Resume Preview'}
        </h1>

        <div
          ref={previewRef}
          className="flex justify-center overflow-x-hidden"
        >
          <ResumePreview forExport />
        </div>
      </div>
    </ResumeInfoContext.Provider>
  )
}

export default ResumeView

import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AddResume from './components/AddResume'
import GlobalApis from '../../service/GlobalApis'
import { useUser } from '@clerk/react'
import ResumeItem from './components/ResumeItem'
import { Loader2 } from 'lucide-react'

function Dashboard() {
  const { user, isLoaded } = useUser()
  const [resumeList, setResumeList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isLoaded) return
    if (!user?.primaryEmailAddress?.emailAddress) {
      setLoading(false)
      return
    }
    GetUserResumesList()
  }, [isLoaded, user])

  const GetUserResumesList = () => {
    const email = user?.primaryEmailAddress?.emailAddress
    if (!email) return

    setLoading(true)
    setError(null)
    GlobalApis.GetUserResume(email)
      .then((res) => {
        setResumeList(res.data?.data || [])
      })
      .catch((err) => {
        const status = err?.response?.status
        const apiBase = import.meta.env.VITE_STRAPI_API_URL || '(not set)'
        if (status === 404) {
          setError(
            `API returned 404. Check VITE_STRAPI_API_URL on Render (must end with /api). Current: ${apiBase}`,
          )
        } else if (status === 401 || status === 403) {
          setError(
            'Strapi rejected the API token. Create a new token in Strapi admin and update VITE_STRAPI_API_KEY, then redeploy.',
          )
        } else if (!import.meta.env.VITE_STRAPI_API_URL) {
          setError(
            'VITE_STRAPI_API_URL is missing. Add it in Render → Environment, then Manual Deploy the frontend.',
          )
        } else {
          setError(err?.message || 'Could not load resumes. Try again.')
        }
        setResumeList([])
      })
      .finally(() => setLoading(false))
  }

  const count = resumeList.length

  return (
    <div className="min-h-[calc(100vh-3.5rem)] bg-[#f4f4f5]">
      <div className="border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <h1 className="text-lg font-bold text-gray-900 tracking-tight">
                Your resumes
              </h1>
              {!loading && count > 0 && (
                <span className="text-xs font-medium text-gray-500">
                  {count} {count === 1 ? 'file' : 'files'}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-0.5 truncate">
              {count === 0
                ? 'Create a document to get started'
                : 'Edit or download from any card'}
            </p>
          </div>

          <Link
            to="/ats-checker"
            className="inline-flex items-center px-3 py-1.5 text-xs font-semibold text-gray-900 bg-white border border-gray-300 rounded-md hover:border-gray-900 hover:bg-gray-50 transition-colors shrink-0 self-start sm:self-center"
          >
            Scan against a job post
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 py-6">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            {error}
          </div>
        )}
        {loading ? (
          <div className="flex items-center justify-center py-24 text-gray-500 gap-2">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm font-medium">Loading your files…</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-6">
            <AddResume />
            {resumeList.map((resume) => (
              <ResumeItem
                resume={resume}
                key={resume.documentId || resume.id}
                refreshData={GetUserResumesList}
              />
            ))}
          </div>
        )}

        {!loading && count === 0 && (
          <p className="text-center text-sm text-gray-500 mt-8 max-w-md mx-auto leading-relaxed">
            After you create a resume, it appears here with a preview thumbnail.
            Use the menu on each card to preview or download.
          </p>
        )}
      </div>
    </div>
  )
}

export default Dashboard

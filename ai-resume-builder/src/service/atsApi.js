const DEFAULT_ATS_API_URL = 'https://nexume-ats-api.onrender.com'

export function getAtsApiUrl() {
  return (import.meta.env.VITE_ATS_API_URL || DEFAULT_ATS_API_URL).replace(
    /\/$/,
    '',
  )
}

export async function analyzeResumeWithAts({ jobDescription, resumeFile }) {
  const baseUrl = getAtsApiUrl()
  const formData = new FormData()
  formData.append('job_description', jobDescription)
  formData.append('resume', resumeFile)

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 120000)

  try {
    const response = await fetch(`${baseUrl}/analyze`, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
    })

    const data = await response.json().catch(() => ({}))

    if (!response.ok) {
      throw new Error(
        data.message || data.error || `Request failed (${response.status})`,
      )
    }

    if (!data.success) {
      throw new Error(data.message || data.error || 'Analysis failed')
    }

    return data
  } catch (err) {
    if (err.name === 'AbortError') {
      throw new Error(
        'Request timed out. The server may be waking up — please try again in a minute.',
      )
    }
    if (err.message?.includes('Failed to fetch')) {
      throw new Error(
        'Cannot reach ATS server. Check your connection or try again shortly.',
      )
    }
    throw err
  } finally {
    clearTimeout(timeout)
  }
}

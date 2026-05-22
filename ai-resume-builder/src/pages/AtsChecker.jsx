import React from 'react'
import { FileSearch } from 'lucide-react'

function AtsChecker() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <FileSearch className="h-7 w-7 text-primary" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">ATS Checker</h1>
      <p className="mt-3 text-gray-500">
        Scan your resume for ATS compatibility, keyword match, and formatting issues.
        This feature is coming soon.
      </p>
    </div>
  )
}

export default AtsChecker

import React from 'react'
import { Link } from 'react-router-dom'
import { Brain, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

function GenerateWithAi() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
        <Brain className="h-7 w-7 text-primary" />
      </div>
      <h1 className="text-3xl font-bold text-gray-900">Generate with AI</h1>
      <p className="mt-3 text-gray-500">
        Use AI to generate resume summaries, experience bullets, and skill suggestions
        while editing your resume.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link to="/dashboard">
          <Button className="gap-2">
            <Sparkles className="h-4 w-4" />
            Go to Dashboard
          </Button>
        </Link>
      </div>
      <p className="mt-6 text-sm text-gray-400">
        Open any resume → Summary section → &quot;Generate With AI&quot;
      </p>
    </div>
  )
}

export default GenerateWithAi

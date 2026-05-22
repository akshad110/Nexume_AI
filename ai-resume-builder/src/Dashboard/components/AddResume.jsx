import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from 'uuid'
import GlobalApis from '../../../service/GlobalApis'
import { useUser } from '@clerk/react'
import { useNavigate } from 'react-router-dom'
import {
  RESUME_TEMPLATES,
  DEFAULT_TEMPLATE_ID,
} from '@/data/resumeTemplates'
import { getInitialResumeData } from '@/data/templateSamples'
import StaticTemplateCard from './StaticTemplateCard'
import { cn } from '@/lib/utils'

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE_ID)
  const [resumeTitle, setResumeTitle] = useState('')
  const [loading, setLoading] = useState(false)
  const { user } = useUser()
  const navigation = useNavigate()

  const resetDialog = () => {
    setOpenDialog(false)
    setSelectedTemplate(DEFAULT_TEMPLATE_ID)
    setResumeTitle('')
  }

  const onCreate = () => {
    if (!resumeTitle.trim()) return

    setLoading(true)
    const uuid = uuidv4()
    const payload = getInitialResumeData(selectedTemplate, {
      title: resumeTitle.trim(),
      resumeid: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName,
    })

    GlobalApis.CreateNewResume({ data: payload })
      .then((res) => {
        if (res?.data?.data?.documentId) {
          resetDialog()
          navigation(
            '/dashboard/resume/' + res.data.data.documentId + '/edit?step=1',
          )
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpenDialog(true)}
        className={cn(
          'group flex flex-col items-center justify-center min-h-[280px] w-full',
          'bg-white border-2 border-dashed border-gray-300 rounded-lg',
          'hover:border-gray-900 hover:bg-gray-50 transition-all duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-900 focus-visible:ring-offset-2',
        )}
      >
        <span className="font-mono text-3xl font-black text-gray-300 group-hover:text-gray-900 transition-colors">
          +
        </span>
        <span className="mt-3 text-sm font-bold text-gray-900">New resume</span>
        <span className="mt-1 text-xs text-gray-500">Pick a template to start</span>
      </button>

      <Dialog
        open={openDialog}
        onOpenChange={(open) => (open ? setOpenDialog(true) : resetDialog())}
      >
        <DialogContent
          className="!max-w-4xl w-[min(96vw,56rem)] max-h-[90vh] overflow-y-auto p-0 gap-0"
          showCloseButton={true}
        >
          <div className="px-6 pt-6 pb-4 border-b border-gray-100">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-1">
              New document
            </p>
            <DialogTitle className="text-2xl font-black text-gray-900 tracking-tight">
              Create a resume
            </DialogTitle>
            <p className="text-sm text-gray-600 mt-1">
              Name it, then choose a layout. You can change content anytime.
            </p>
          </div>

          <div className="px-6 py-5 space-y-6">
            <div>
              <label
                htmlFor="resume-title"
                className="block text-sm font-bold text-gray-900 mb-2"
              >
                Title
              </label>
              <Input
                id="resume-title"
                className="w-full h-11 rounded-md border-gray-200 bg-gray-50 focus:bg-white"
                placeholder="e.g. Product Designer — Acme Corp"
                value={resumeTitle}
                onChange={(e) => setResumeTitle(e.target.value)}
              />
            </div>

            <div>
              <p className="text-sm font-bold text-gray-900 mb-3">Layout</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {RESUME_TEMPLATES.map((template) => (
                  <StaticTemplateCard
                    key={template.id}
                    template={template}
                    selected={selectedTemplate === template.id}
                    onSelect={() => setSelectedTemplate(template.id)}
                  />
                ))}
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-gray-100 bg-gray-50/80 flex gap-3 justify-end sm:justify-end">
            <Button type="button" variant="ghost" onClick={resetDialog}>
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!resumeTitle.trim() || loading}
              onClick={onCreate}
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold min-w-[120px]"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                'Create'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddResume

import { Loader2, PlusSquare } from 'lucide-react'
import React, { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { v4 as uuidv4 } from "uuid"
import GlobalApis from '../../../service/GlobalApis'
import { useUser } from '@clerk/react'
import { useNavigate } from 'react-router-dom'
import {
  RESUME_TEMPLATES,
  DEFAULT_TEMPLATE_ID,
} from '@/data/resumeTemplates'
import { getInitialResumeData } from '@/data/templateSamples'
import StaticTemplateCard from './StaticTemplateCard'

function AddResume() {
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState(DEFAULT_TEMPLATE_ID)
  const [resumeTitle, setResumeTitle] = useState("")
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
    <div>
      <div
        className="p-14 py-24 border items-center flex justify-center bg-secondary rounded-lg h-[280px] hover:scale-105 transition-all hover:shadow-md cursor-pointer border-dashed"
        onClick={() => setOpenDialog(true)}
      >
        <PlusSquare className="h-10 w-10 text-muted-foreground" />
      </div>

      <Dialog
        open={openDialog}
        onOpenChange={(open) => (open ? setOpenDialog(true) : resetDialog())}
      >
        <DialogContent
          className="!max-w-4xl w-[min(96vw,56rem)] max-h-[90vh] overflow-y-auto p-6"
          showCloseButton={true}
        >
          <DialogTitle className="text-xl font-bold">
            Create New Resume
          </DialogTitle>

          <p className="text-sm text-gray-500 -mt-2">
            Add a title, then choose one of 3 templates below.
          </p>

          <div className="mt-4">
            <label
              htmlFor="resume-title"
              className="block text-sm font-medium text-gray-900 mb-1.5"
            >
              Resume title
            </label>
            <Input
              id="resume-title"
              className="w-full"
              placeholder="Ex. Full Stack Developer Resume"
              value={resumeTitle}
              onChange={(e) => setResumeTitle(e.target.value)}
            />
          </div>

          <div className="mt-6">
            <p className="text-sm font-semibold text-gray-900 mb-3">
              Choose a template
            </p>
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

          <DialogFooter className="mt-6 flex gap-3 justify-end sm:justify-end">
            <Button type="button" variant="ghost" onClick={resetDialog}>
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!resumeTitle.trim() || loading}
              onClick={onCreate}
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
    </div>
  )
}

export default AddResume

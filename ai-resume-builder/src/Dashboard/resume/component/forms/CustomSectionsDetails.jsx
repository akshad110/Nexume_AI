import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApis from '../../../../../service/GlobalApis'
import { toast } from 'sonner'
import RichTextEditor from '../RichTextEditor'

const emptySection = { title: '', content: '' }

function CustomSectionsDetails() {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [sectionsList, setSectionsList] = useState([{ ...emptySection }])
  const initializedFor = useRef(null)

  useEffect(() => {
    const id = resumeInfo?.documentId
    if (!id || initializedFor.current === id) return
    initializedFor.current = id
    if (resumeInfo?.customSections?.length > 0) {
      setSectionsList(resumeInfo.customSections)
    }
  }, [resumeInfo?.documentId])

  const syncPreview = (list) => {
    setResumeInfo((prev) => ({ ...prev, customSections: list }))
  }

  const handleEvent = (e, index) => {
    const next = sectionsList.slice()
    next[index][e.target.name] = e.target.value
    setSectionsList(next)
    syncPreview(next)
  }

  const handleRichTextEditor = (html, index) => {
    const next = sectionsList.slice()
    next[index].content = html
    setSectionsList(next)
    syncPreview(next)
  }

  const addSection = () => {
    const next = [...sectionsList, { ...emptySection }]
    setSectionsList(next)
    syncPreview(next)
  }

  const removeSection = () => {
    const next =
      sectionsList.length > 1 ? sectionsList.slice(0, -1) : sectionsList
    setSectionsList(next)
    syncPreview(next)
  }

  const onSave = () => {
    const filled = sectionsList.filter((s) => s.title?.trim())
    const invalid = sectionsList.some((s) => s.content?.trim() && !s.title?.trim())
    if (invalid) {
      toast.error('Each custom section needs a title')
      return
    }

    setLoading(true)
    GlobalApis.UpdateResumeInfo(params.resumeid, {
      data: { customSections: filled },
    })
      .then(() => {
        setLoading(false)
        toast.success('Custom sections saved')
      })
      .catch(() => {
        setLoading(false)
        toast.error('Failed to save')
      })
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Custom sections</h2>
      <p className="text-sm text-muted-foreground mt-1">
        Add extra blocks such as Coursework, Achievements, Certifications, or
        Volunteer work.
      </p>

      {sectionsList.map((item, index) => (
        <div
          key={index}
          className="grid grid-cols-1 gap-3 border p-3 my-5 rounded-lg"
        >
          <div>
            <label className="text-xs">Section title</label>
            <Input
              name="title"
              value={item.title ?? ''}
              placeholder="Coursework"
              onChange={(e) => handleEvent(e, index)}
            />
          </div>
          <div>
            <RichTextEditor
              index={index}
              label="Content"
              enableAi={false}
              defaultValue={item.content}
              onRichTextEditorChange={(html) =>
                handleRichTextEditor(html, index)
              }
            />
          </div>
        </div>
      ))}

      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" className="text-primary" onClick={addSection}>
          + Add section
        </Button>
        <Button variant="outline" className="text-primary" onClick={removeSection}>
          Remove
        </Button>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default CustomSectionsDetails

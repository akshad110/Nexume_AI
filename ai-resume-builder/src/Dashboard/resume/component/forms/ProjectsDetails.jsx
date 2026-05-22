import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApis from '../../../../../service/GlobalApis'
import { toast } from 'sonner'

const emptyProject = { name: '', description: '' }

function ProjectsDetails() {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [projectsList, setProjectsList] = useState([{ ...emptyProject }])
  const initializedFor = useRef(null)

  useEffect(() => {
    const id = resumeInfo?.documentId
    if (!id || initializedFor.current === id) return
    initializedFor.current = id
    if (resumeInfo?.projects?.length > 0) {
      setProjectsList(resumeInfo.projects)
    }
  }, [resumeInfo?.documentId])

  const syncPreview = (list) => {
    setResumeInfo((prev) => ({ ...prev, projects: list }))
  }

  const handleEvent = (e, index) => {
    const newEntries = projectsList.slice()
    const { name, value } = e.target
    newEntries[index][name] = value
    setProjectsList(newEntries)
    syncPreview(newEntries)
  }

  const addProject = () => {
    const next = [...projectsList, { ...emptyProject }]
    setProjectsList(next)
    syncPreview(next)
  }

  const removeProject = () => {
    const next = projectsList.length > 1 ? projectsList.slice(0, -1) : projectsList
    setProjectsList(next)
    syncPreview(next)
  }

  const onSave = () => {
    setLoading(true)
    GlobalApis.UpdateResumeInfo(params.resumeid, {
      data: { projects: projectsList },
    })
      .then(() => {
        setLoading(false)
        toast.success('Projects updated')
      })
      .catch(() => {
        setLoading(false)
        toast.error('Failed to save projects')
      })
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Projects</h2>
      <p>Add projects after your professional experience</p>
      <div>
        {projectsList.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-1 gap-3 border p-3 my-5 rounded-lg"
          >
            <div>
              <label>Project Name</label>
              <Input
                name="name"
                value={item.name ?? ''}
                placeholder="QuantSoftware Toolkit"
                onChange={(e) => handleEvent(e, index)}
              />
            </div>
            <div>
              <label>Description</label>
              <Textarea
                name="description"
                value={item.description ?? ''}
                placeholder="Open source python library for financial data analysis..."
                onChange={(e) => handleEvent(e, index)}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 flex-wrap">
        <Button variant="outline" className="text-primary" onClick={addProject}>
          + Add Project
        </Button>
        <Button variant="outline" className="text-primary" onClick={removeProject}>
          Remove
        </Button>
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default ProjectsDetails

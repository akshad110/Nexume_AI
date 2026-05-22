import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ResumeInfoContext } from '@/context/ResumeContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import GlobalApis from '../../../../../service/GlobalApis'
import { toast } from 'sonner'

function ProgrammingSkillsDetails() {
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [skills, setSkills] = useState({ languages: '', technologies: '' })
  const initializedFor = useRef(null)

  useEffect(() => {
    const id = resumeInfo?.documentId
    if (!id || initializedFor.current === id) return
    initializedFor.current = id
    if (resumeInfo?.programmingSkills) {
      setSkills({
        languages: resumeInfo.programmingSkills.languages || '',
        technologies: resumeInfo.programmingSkills.technologies || '',
      })
    }
  }, [resumeInfo?.documentId])

  const syncPreview = (next) => {
    setResumeInfo((prev) => ({ ...prev, programmingSkills: next }))
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    const next = { ...skills, [name]: value }
    setSkills(next)
    syncPreview(next)
  }

  const onSave = () => {
    setLoading(true)
    GlobalApis.UpdateResumeInfo(params.resumeid, {
      data: { programmingSkills: skills },
    })
      .then(() => {
        setLoading(false)
        toast.success('Programming skills updated')
      })
      .catch(() => {
        setLoading(false)
        toast.error('Failed to save')
      })
  }

  return (
    <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
      <h2 className="font-bold text-lg">Programming Skills</h2>
      <p>Languages and technologies (comma-separated, as in ATS resumes)</p>
      <div className="grid gap-4 mt-5">
        <div>
          <label className="text-sm">Languages</label>
          <Input
            name="languages"
            value={skills.languages}
            placeholder="Scala, Python, Javascript, C++, SQL, Java"
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="text-sm">Technologies</label>
          <Input
            name="technologies"
            value={skills.technologies}
            placeholder="AWS, Play, React, Kafka, GCE"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button disabled={loading} onClick={onSave}>
          {loading ? <LoaderCircle className="animate-spin" /> : 'Save'}
        </Button>
      </div>
    </div>
  )
}

export default ProgrammingSkillsDetails

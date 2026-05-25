import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ArrowDown, ArrowUp, ListOrdered, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ResumeInfoContext } from '@/context/ResumeContext'
import GlobalApis from '../../../../service/GlobalApis'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import {
  RESUME_SECTION_META,
  getSectionOrder,
  getSectionVisibility,
  moveSectionInOrder,
  setSectionVisible,
} from '@/lib/resumeSectionLayout'

function SectionLayoutPicker({ documentId: documentIdProp }) {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { resumeid } = useParams()
  const documentId = documentIdProp ?? resumeid
  const [saving, setSaving] = useState(false)

  if (!resumeInfo) return null

  const order = getSectionOrder(resumeInfo)
  const visibility = getSectionVisibility(resumeInfo)

  const persist = (next) => {
    setResumeInfo(next)
    if (!documentId) return

    setSaving(true)
    GlobalApis.UpdateResumeInfo(documentId, {
      data: {
        sectionOrder: next.sectionOrder,
        sectionVisibility: next.sectionVisibility,
      },
    })
      .then(() => toast.success('Section layout saved'))
      .catch(() => {
        toast.error('Failed to save section layout')
        setResumeInfo(resumeInfo)
      })
      .finally(() => setSaving(false))
  }

  const applyLayout = (sectionOrder, sectionVisibility) => {
    persist({
      ...resumeInfo,
      sectionOrder,
      sectionVisibility,
    })
  }

  const toggleVisible = (sectionId, checked) => {
    applyLayout(order, setSectionVisible(visibility, sectionId, checked))
  }

  const move = (sectionId, direction) => {
    applyLayout(moveSectionInOrder(order, sectionId, direction), visibility)
  }

  const labelFor = (id) =>
    RESUME_SECTION_META.find((s) => s.id === id)?.label ?? id

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2" disabled={saving}>
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ListOrdered className="h-4 w-4" />
          )}
          Sections
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-72 p-2">
        <p className="px-1 py-1.5 text-xs font-normal text-muted-foreground">
          Checked sections show in the preview. Top = first on resume.
        </p>
        <ul className="space-y-1">
          {order.map((sectionId, index) => {
            const checked = visibility[sectionId] !== false
            return (
              <li
                key={sectionId}
                className="flex items-center gap-1 rounded-md border border-transparent px-1 py-0.5 hover:bg-accent/50"
              >
                <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-2 py-1.5 pl-1">
                  <input
                    type="checkbox"
                    className="h-4 w-4 shrink-0 rounded border-gray-300 accent-gray-900"
                    checked={checked}
                    onChange={(e) => toggleVisible(sectionId, e.target.checked)}
                  />
                  <span
                    className={cn(
                      'truncate text-sm',
                      checked ? 'font-medium text-foreground' : 'text-muted-foreground',
                    )}
                  >
                    {labelFor(sectionId)}
                  </span>
                </label>
                <div className="flex shrink-0 gap-0.5">
                  <button
                    type="button"
                    aria-label={`Move ${labelFor(sectionId)} up`}
                    disabled={index === 0}
                    onClick={() => move(sectionId, 'up')}
                    className="rounded p-1 text-muted-foreground hover:bg-accent disabled:opacity-30"
                  >
                    <ArrowUp className="h-3.5 w-3.5" />
                  </button>
                  <button
                    type="button"
                    aria-label={`Move ${labelFor(sectionId)} down`}
                    disabled={index === order.length - 1}
                    onClick={() => move(sectionId, 'down')}
                    className="rounded p-1 text-muted-foreground hover:bg-accent disabled:opacity-30"
                  >
                    <ArrowDown className="h-3.5 w-3.5" />
                  </button>
                </div>
              </li>
            )
          })}
        </ul>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default SectionLayoutPicker

import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Check, LayoutGrid, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ResumeInfoContext } from '@/context/ResumeContext'
import GlobalApis from '../../../../service/GlobalApis'
import { RESUME_THEMES, getActiveTheme } from '@/data/resumeThemes'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'

function ThemePicker() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const { resumeid } = useParams()
  const [saving, setSaving] = useState(false)
  const activeTheme = getActiveTheme(resumeInfo?.themeColor)

  const onThemeSelect = (theme) => {
    if (theme.color === resumeInfo?.themeColor) return

    const updated = { ...resumeInfo, themeColor: theme.color }
    setResumeInfo(updated)
    setSaving(true)

    GlobalApis.UpdateResumeInfo(resumeid, { data: { themeColor: theme.color } })
      .then(() => {
        toast.success(`${theme.name} theme applied`)
      })
      .catch(() => {
        toast.error('Failed to save theme')
        setResumeInfo(resumeInfo)
      })
      .finally(() => setSaving(false))
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex gap-2" disabled={saving}>
          {saving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <LayoutGrid className="h-4 w-4" />
          )}
          Theme
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-64 p-3" align="start">
        <p className="text-xs font-medium text-muted-foreground mb-3">
          Choose a color theme
        </p>
        <div className="grid grid-cols-5 gap-2">
          {RESUME_THEMES.map((theme) => {
            const isActive = activeTheme.id === theme.id
            return (
              <button
                key={theme.id}
                type="button"
                onClick={() => onThemeSelect(theme)}
                disabled={saving}
                className={cn(
                  'flex flex-col items-center gap-1.5 rounded-lg p-1.5 transition-colors hover:bg-muted',
                  isActive && 'bg-muted',
                )}
                style={
                  isActive
                    ? { outline: `2px solid ${theme.color}`, outlineOffset: '2px' }
                    : undefined
                }
                title={theme.name}
              >
                <span
                  className="relative flex h-9 w-9 items-center justify-center rounded-full border border-black/10 shadow-sm"
                  style={{ backgroundColor: theme.color }}
                >
                  {isActive && (
                    <Check className="h-4 w-4 text-white drop-shadow-sm" strokeWidth={3} />
                  )}
                </span>
                <span className="text-[10px] font-medium leading-none">
                  {theme.name}
                </span>
              </button>
            )
          })}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ThemePicker

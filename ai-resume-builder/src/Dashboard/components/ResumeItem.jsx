import { Loader2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { toast } from 'sonner'
import GlobalApis from '../../../service/GlobalApis'
import { getTemplateMeta } from '@/data/resumeTemplates'
import ResumeDocMock from './ResumeDocMock'
import { cn } from '@/lib/utils'

function formatResumeDate(iso) {
  if (!iso) return null
  try {
    return new Date(iso).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  } catch {
    return null
  }
}

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate()
  const [openAlert, setOpenAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const template = getTemplateMeta(resume?.templateId)
  const accent = resume?.themeColor || template.previewAccent || '#171717'
  const edited = formatResumeDate(resume?.updatedAt)

  const onDelete = () => {
    setLoading(true)
    GlobalApis.DeleteResumeById(resume.documentId)
      .then(() => {
        toast.success('Resume deleted')
        refreshData?.()
        setOpenAlert(false)
      })
      .catch(() => {
        toast.error('Failed to delete resume')
      })
      .finally(() => setLoading(false))
  }

  const onDownload = () => {
    setDownloading(true)
    navigation('/my-resume/' + resume.documentId + '/view?download=true')
    setTimeout(() => setDownloading(false), 500)
  }

  return (
    <>
      <article
        className={cn(
          'group flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden',
          'transition-all duration-200 hover:border-gray-400 hover:shadow-[0_12px_40px_-12px_rgba(0,0,0,0.15)]',
        )}
      >
        <Link
          to={'/dashboard/resume/' + resume.documentId + '/edit'}
          className="block flex-1 bg-[#ececee] hover:bg-[#e4e4e7] transition-colors"
        >
          <ResumeDocMock
            accent={accent}
            label={template.name.split(' ')[0]}
          />
        </Link>

        <footer className="border-t border-gray-100 px-4 py-3.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <h2 className="text-sm font-bold text-gray-900 truncate leading-tight">
                {resume.title}
              </h2>
              <p className="text-[11px] text-gray-500 mt-1 font-medium">
                {template.name}
                {edited ? ` · Edited ${edited}` : ''}
              </p>
            </div>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label="Resume options"
                  className="shrink-0 w-8 h-8 flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 hover:bg-gray-100 font-bold tracking-widest text-sm leading-none"
                >
                  ···
                </button>
              </DropdownMenuTrigger>

              <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuItem
                  onClick={() =>
                    navigation(
                      '/dashboard/resume/' + resume.documentId + '/edit',
                    )
                  }
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    navigation('/my-resume/' + resume.documentId + '/view')
                  }
                >
                  Preview
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onDownload} disabled={downloading}>
                  {downloading ? 'Opening…' : 'Download PDF'}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => setOpenAlert(true)}
                  className="text-destructive focus:text-destructive"
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Link
            to={'/dashboard/resume/' + resume.documentId + '/edit'}
            className="mt-3 inline-block text-xs font-semibold text-gray-900 underline underline-offset-2 decoration-gray-300 group-hover:decoration-gray-900"
          >
            Continue editing
          </Link>
        </footer>
      </article>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this resume?</AlertDialogTitle>
            <AlertDialogDescription>
              &quot;{resume.title}&quot; will be removed permanently. This
              can&apos;t be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={onDelete}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting…
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}

export default ResumeCardItem

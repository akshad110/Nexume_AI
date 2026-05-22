import { Download, Eye, Loader2, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from 'sonner'
import GlobalApis from '../../../service/GlobalApis'

function ResumeCardItem({ resume, refreshData }) {
  const navigation = useNavigate()
  const [openAlert, setOpenAlert] = useState(false)
  const [loading, setLoading] = useState(false)
  const [downloading, setDownloading] = useState(false)

  const onDelete = () => {
    setLoading(true)
    GlobalApis.DeleteResumeById(resume.documentId)
      .then(() => {
        toast.success('Resume deleted!')
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
      <div className='rounded-lg shadow-lg overflow-hidden bg-black'>
        <Link to={'/dashboard/resume/' + resume.documentId + "/edit"}>
          <div
            className='p-14 bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 h-[230px] flex items-center justify-center'
            style={{ borderColor: resume?.themeColor }}
          >
            <img src="/cv.png" width={80} height={80} alt="Resume" />
          </div>
        </Link>

        <div
          className='p-3 flex items-center justify-between text-white'
          style={{ background: resume?.themeColor }}
        >
          <h2 className='text-sm font-medium truncate'>
            {resume.title}
          </h2>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button type="button" aria-label="Resume options">
                <MoreVertical className='h-4 w-4 cursor-pointer' />
              </button>
            </DropdownMenuTrigger>

            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  navigation('/dashboard/resume/' + resume.documentId + "/edit")
                }
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() =>
                  navigation('/my-resume/' + resume.documentId + '/view')
                }
              >
                <Eye className="mr-2 h-4 w-4" />
                View Resume
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={onDownload}
                disabled={downloading}
              >
                {downloading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Download className="mr-2 h-4 w-4" />
                )}
                Download Resume
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => setOpenAlert(true)}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <AlertDialog open={openAlert} onOpenChange={setOpenAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete &quot;{resume.title}&quot;. This action cannot be undone.
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
                  Deleting...
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

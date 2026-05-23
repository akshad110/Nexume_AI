import React, { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../component/FormSection';
import ResumePreview from '../../component/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeContext';
import GlobalApis from '../../../../../service/GlobalApis';
import { normalizeResume } from '@/lib/normalizeResume';
import { downloadResumePdf, getSafeFileName } from '@/lib/downloadResumePdf';
import { Button } from '@/components/ui/button';
import { Download, Loader2 } from 'lucide-react';
import { toast } from 'sonner';


function ResumeEdit() {
    const {resumeid} = useParams();
    const [resumeInfo,setResumeInfo] = useState();
    const [downloading, setDownloading] = useState(false);
  

   useEffect(()=>{
    getResumeInfo();
},[])

const getResumeInfo = () => {

  GlobalApis.GetResumeById(resumeid)
    .then((res) => {

      console.log(res.data.data);

      setResumeInfo(normalizeResume(res.data.data));

    });

}

  const handleDownload = useCallback(async () => {
    if (!resumeInfo) {
      toast.error('Resume is not loaded yet')
      return
    }
    setDownloading(true)
    try {
      await downloadResumePdf(resumeInfo, getSafeFileName(resumeInfo?.title))
      toast.success('Resume downloaded')
    } catch (err) {
      console.error(err)
      toast.error(err?.message || 'Failed to download PDF')
    } finally {
      setDownloading(false)
    }
  }, [resumeInfo])

  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className="grid grid-cols-1 md:grid-cols-2 p-6 md:p-10 gap-8 md:gap-10 min-w-0 overflow-x-hidden">
      <div className="min-w-0">
        <div className="flex justify-end mb-2 md:hidden">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="gap-2"
            disabled={downloading}
            onClick={handleDownload}
          >
            {downloading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Download PDF
          </Button>
        </div>
        <FormSection onDownload={handleDownload} downloading={downloading} />
      </div>
      <div className="min-w-0 flex justify-center overflow-x-hidden">
        <ResumePreview />
      </div>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default ResumeEdit

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../component/FormSection';
import ResumePreview from '../../component/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeContext';
import GlobalApis from '../../../../../service/GlobalApis';
import { normalizeResume } from '@/lib/normalizeResume';


function ResumeEdit() {
    const {resumeid} = useParams();
    const [resumeInfo,setResumeInfo] = useState();
  

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
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-3 md:grid-cols-2 p-10 gap-10 '>
      {/* form section */}
       <FormSection/>
      {/* preview section */}
       <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default ResumeEdit

import { ResumeInfoContext } from '@/context/ResumeContext'
import React, { useContext } from 'react'
import PersonalDetail from './preview/PersonalDetail'
import Summary from './preview/Summary'
import Experience from './preview/Experience'
import Education from './preview/Education'
import Skills from './preview/Skills'

function ResumePreview() {

    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext)
  return (
    <div className='shadow-lg h-full p-14 border-t-[20px]'
    style={{
        borderColor:resumeInfo?.themeColor
    }}
    > 
     {/* Personal Detail*/}
      <PersonalDetail resumeInfo={resumeInfo}/>
     {/* Summary */}
        <Summary resumeInfo={resumeInfo}/>
     {/* Professional Experience */}
       <Experience resumeInfo={resumeInfo}/>
     {/* Education */}
       <Education resumeInfo={resumeInfo}/>
     {/* Skills */}
       <Skills resumeInfo={resumeInfo}/>
    </div>
  )
}

export default ResumePreview

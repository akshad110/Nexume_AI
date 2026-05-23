import React from 'react'
import { classicHrStyle } from '@/lib/resumeDividerStyles'

function PersonalDetail({resumeInfo}) {
  return (
    <div>
      <h2 className='font-bold text-xl text-center'
      
      style={{
        color:resumeInfo?.themeColor
      }}
      
      >{resumeInfo?.firstName} {resumeInfo?.lastName}</h2>
      <h2 className='font-medium text-sm text-center'>{resumeInfo?.jobTitle}</h2>
      <h2 className='text-center text-sx font-normal'
       style={{
        color:resumeInfo?.themeColor
      }}
      >{resumeInfo?.address}</h2>

      <div className='flex justify-between'>
        <h2 className='text-xs font-normal'
         style={{
        color:resumeInfo?.themeColor
      }}
        >{resumeInfo?.phone}</h2>
        <h2 className='text-xs font-normal'
         style={{
        color:resumeInfo?.themeColor
      }}
        >{resumeInfo?.email}</h2>
      </div>
      <hr data-resume-hr style={classicHrStyle(resumeInfo?.themeColor)} />


    </div>
  )
}

export default PersonalDetail

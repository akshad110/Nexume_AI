import React from 'react'
import { MODERN_FONT } from '@/lib/resumeExportStyles'
import { classicHrStyle } from '@/lib/resumeDividerStyles'

function Experience({ resumeInfo, hideTitle = false, variant = 'classic' }) {
  const isModern = variant === 'modern'

  return (
    <div className={hideTitle ? 'my-2' : 'my-6'}>
      {!hideTitle && (
        <>
          <h2
            className="text-center font-bold text-sm mb-2"
            style={{ color: resumeInfo?.themeColor }}
          >
            Professional Experience
          </h2>
          <hr data-resume-hr style={classicHrStyle(resumeInfo?.themeColor)} />
        </>
      )}

      {(resumeInfo?.experience ?? []).map((experience, index) => (
                <div key={index} className='my-5'>

            <h2
            className={isModern ? 'font-bold' : 'text-sm font-bold'}
            style={{
        color:resumeInfo?.themeColor,
        ...(isModern ? { fontSize: MODERN_FONT.section } : {}),
      }}
            >{experience?.title}</h2>
            <h2 className={isModern ? 'flex justify-between' : 'text-xs flex justify-between'}
            style={isModern ? { fontSize: MODERN_FONT.body } : undefined}
            >{experience?.companyName},
                {experience?.city},
                {experience?.state}
                <span>{experience?.startDate+" "} 
                  - 
              {experience?.currenlyworking?'Present':"   "+experience.endDate}</span>
            </h2>

           

          <div
  className={`
    my-2
    [&_ul]:list-disc
    [&_ul]:ml-5
    [&_ol]:list-decimal
    [&_ol]:ml-5
    ${isModern ? '' : 'text-xs'}
  `}
  style={isModern ? { fontSize: MODERN_FONT.body } : undefined}
  dangerouslySetInnerHTML={{
    __html: experience?.workSummery
  }}
></div>
            </div>

      ))}

    </div>
  )
}

export default Experience

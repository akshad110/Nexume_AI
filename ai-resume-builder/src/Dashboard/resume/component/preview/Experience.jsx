import React from 'react'

function Experience({ resumeInfo, hideTitle = false }) {
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
          <hr
            className="border-[1.5px] my-2"
            style={{ borderColor: resumeInfo?.themeColor }}
          />
        </>
      )}

      {(resumeInfo?.experience ?? []).map((experience, index) => (
                <div key={index} className='my-5'>

            <h2 className='text-sm font-bold'
            style={{
        color:resumeInfo?.themeColor
      }}
            >{experience?.title}</h2>
            <h2 className='text-xs flex justify-between'>{experience?.companyName},
                {experience?.city},
                {experience?.state}
                <span>{experience?.startDate+" "} 
                  - 
              {experience?.currenlyworking?'Present':"   "+experience.endDate}</span>
            </h2>

           

          <div
  className="
    text-xs my-2
    [&_ul]:list-disc
    [&_ul]:ml-5
    [&_ol]:list-decimal
    [&_ol]:ml-5
  "
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

import React from 'react'
import { classicHrStyle } from '@/lib/resumeDividerStyles'

function Skills({ resumeInfo }) {

  return (

    <div className='my-6'>

      <h2
        className='text-center font-bold text-sm mb-2'
        style={{
          color: resumeInfo?.themeColor
        }}
      >
        Skills
      </h2>

      <hr
        data-resume-hr
        style={classicHrStyle(resumeInfo?.themeColor)}
      />

      <div className='space-y-2 my-4'>

        {(resumeInfo?.skills ?? []).map((item, index) => (

          <div
            key={index}
            className='text-xs'
          >

            <span
              className='font-bold'
              style={{
                color: resumeInfo?.themeColor
              }}
            >
              {item?.title}:
            </span>

            {" "}

            {(item?.skills ?? []).join(', ')}

          </div>

        ))}

      </div>

    </div>

  )

}

export default Skills
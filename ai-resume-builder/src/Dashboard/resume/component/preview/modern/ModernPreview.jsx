import React from 'react'
import PersonalDetail from '../PersonalDetail'
import Summary from '../Summary'
import Experience from '../Experience'
import Education from '../Education'
import Skills from '../Skills'

function ModernPreview({ resumeInfo }) {
  const accent = resumeInfo?.themeColor || '#0f172a'

  return (
    <div
      className="text-black text-[11px] leading-relaxed"
      style={{ color: '#111', fontFamily: 'system-ui, sans-serif' }}
    >
      <div className="border-b-2 pb-3 mb-4" style={{ borderColor: accent }}>
        <PersonalDetail resumeInfo={resumeInfo} />
      </div>

      {resumeInfo?.summery ? (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: accent }}
          >
            Summary
          </h2>
          <Summary resumeInfo={resumeInfo} />
        </section>
      ) : null}

      <section className="mb-4">
        <h2
          className="text-xs font-bold uppercase tracking-widest mb-2"
          style={{ color: accent }}
        >
          Experience
        </h2>
        <Experience resumeInfo={resumeInfo} />
      </section>

      {(resumeInfo?.education ?? []).length > 0 && (
        <section className="mb-4">
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: accent }}
          >
            Education
          </h2>
          <Education resumeInfo={resumeInfo} />
        </section>
      )}

      {(resumeInfo?.skills ?? []).length > 0 && (
        <section>
          <h2
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: accent }}
          >
            Skills
          </h2>
          <Skills resumeInfo={resumeInfo} />
        </section>
      )}
    </div>
  )
}

export default ModernPreview

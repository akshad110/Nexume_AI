import React from 'react'
import { cn } from '@/lib/utils'
import { TEMPLATE_IDS } from '@/data/resumeTemplates'

function StaticTemplateCard({ template, selected, onSelect }) {
  const isProfessional = template.id === TEMPLATE_IDS.PROFESSIONAL
  const isModern = template.id === TEMPLATE_IDS.MODERN

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'relative min-w-0 w-full rounded-lg border-2 bg-white p-3 text-left transition-all',
        selected
          ? 'border-gray-900 shadow-md'
          : 'border-gray-200 hover:border-gray-400',
      )}
    >
      {selected && (
        <span className="absolute right-2 top-2 z-10 text-[10px] font-bold uppercase tracking-wider text-gray-900 bg-gray-100 px-2 py-0.5 rounded">
          Selected
        </span>
      )}

      <div
        className="h-48 w-full overflow-hidden rounded-lg border border-gray-200 bg-white p-2.5 text-black break-words"
        style={{
          fontFamily: isProfessional
            ? 'Georgia, "Times New Roman", serif'
            : 'system-ui, sans-serif',
          fontSize: '7px',
          lineHeight: 1.35,
        }}
      >
        {isProfessional ? (
          <div>
            <div className="flex justify-between font-bold text-[9px] mb-1">
              <span>Sourabh Bajaj</span>
              <span className="font-normal text-[6px]">mail@website.com</span>
            </div>
            <div className="border-b border-black font-bold uppercase text-[7px] mb-1">
              Education
            </div>
            <div className="flex justify-between mb-1">
              <span className="font-bold">Georgia Tech</span>
              <span>2012 – 2013</span>
            </div>
            <div className="border-b border-black font-bold uppercase text-[7px] mb-1">
              Experience
            </div>
            <div className="font-bold">Google</div>
            <div className="italic text-[6px]">Software Engineer</div>
            <div className="border-b border-black font-bold uppercase text-[7px] my-1">
              Projects
            </div>
            <div>
              <span className="font-bold">QuantSoftware Toolkit</span>: Open source
              library...
            </div>
            <div className="border-b border-black font-bold uppercase text-[7px] mt-1">
              Programming Skills
            </div>
            <div>Languages: Python, Java, SQL...</div>
          </div>
        ) : isModern ? (
          <div>
            <div
              className="border-b-2 pb-1 mb-1 font-bold text-[10px] text-center"
              style={{ borderColor: template.previewAccent }}
            >
              Jordan Lee
            </div>
            <div className="text-[6px] text-center text-gray-500 mb-1">
              Product Engineer
            </div>
            <div
              className="font-bold uppercase text-[7px] mb-0.5"
              style={{ color: template.previewAccent }}
            >
              Summary
            </div>
            <div className="text-[6px] mb-1">Product-focused engineer...</div>
            <div
              className="font-bold uppercase text-[7px]"
              style={{ color: template.previewAccent }}
            >
              Experience
            </div>
          </div>
        ) : (
          <div>
            <div
              className="h-1.5 w-full mb-1 rounded"
              style={{ background: template.previewAccent }}
            />
            <div className="text-center font-bold text-[10px]">Alex Johnson</div>
            <div className="text-center text-[6px] text-gray-500">Full Stack Dev</div>
            <div
              className="text-center font-bold text-[7px] mt-1"
              style={{ color: template.previewAccent }}
            >
              Summary
            </div>
            <div className="text-center text-[6px] text-gray-600 px-1">
              Experienced developer...
            </div>
            <div
              className="text-center font-bold text-[7px] mt-1"
              style={{ color: template.previewAccent }}
            >
              Experience · Projects · Skills
            </div>
          </div>
        )}
      </div>

      <p className="mt-2 text-sm font-semibold text-gray-900">{template.name}</p>
      <p className="text-xs text-gray-500 leading-snug break-words">
        {template.description}
      </p>
    </button>
  )
}

export default StaticTemplateCard

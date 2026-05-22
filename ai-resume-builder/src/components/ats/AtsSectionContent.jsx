import React from 'react'
import { cn } from '@/lib/utils'

const SECTION_ACCENT = {
  missing: 'border-l-amber-500',
  alignment: 'border-l-sky-600',
  suggestions: 'border-l-emerald-600',
}

function AtsSectionContent({ blocks, sectionKey, className }) {
  if (!blocks?.length) return null

  return (
    <div
      className={cn(
        'border-l-[3px] pl-4 space-y-4',
        SECTION_ACCENT[sectionKey] || 'border-l-gray-300',
        className,
      )}
    >
      {blocks.map((block, i) => {
        if (block.type === 'subheading') {
          return (
            <div key={i} className="space-y-1.5">
              <p className="text-[13px] font-bold uppercase tracking-wide text-gray-900">
                {block.label}
              </p>
              {block.content ? (
                <p className="text-[15px] text-gray-600 leading-[1.65]">
                  {block.content}
                </p>
              ) : null}
            </div>
          )
        }

        if (block.type === 'list') {
          return (
            <ul key={i} className="space-y-2.5">
              {block.items.map((item, j) => (
                <li
                  key={j}
                  className="text-[15px] text-gray-600 leading-[1.65] pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.55em] before:w-1.5 before:h-1.5 before:rounded-sm before:bg-gray-400"
                >
                  {item}
                </li>
              ))}
            </ul>
          )
        }

        return (
          <p key={i} className="text-[15px] text-gray-600 leading-[1.65]">
            {block.text}
          </p>
        )
      })}
    </div>
  )
}

export default AtsSectionContent

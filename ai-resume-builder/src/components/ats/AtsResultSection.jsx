import React from 'react'
import AtsSectionContent from './AtsSectionContent'
import ScrollReveal from '@/components/landing/ScrollReveal'
import { cn } from '@/lib/utils'

const SECTION_META = {
  missing: {
    num: '02',
    tag: 'Gaps',
    gradient: 'from-amber-50 to-orange-50/50',
    accent: 'bg-amber-500',
  },
  alignment: {
    num: '03',
    tag: 'Fit',
    gradient: 'from-sky-50 to-blue-50/50',
    accent: 'bg-sky-500',
  },
  suggestions: {
    num: '04',
    tag: 'Fixes',
    gradient: 'from-emerald-50 to-teal-50/50',
    accent: 'bg-emerald-500',
  },
}

function AtsResultSection({ section, index }) {
  const meta = SECTION_META[section.key] || {
    num: String(index + 2),
    tag: '',
    gradient: 'from-gray-50 to-white',
    accent: 'bg-gray-400',
  }

  return (
    <ScrollReveal delay={index * 80}>
      <article
        className={cn(
          'overflow-hidden rounded-[1.75rem] border border-gray-200/80 bg-white shadow-[0_8px_30px_-12px_rgba(0,0,0,0.1)] hover:shadow-[0_16px_40px_-12px_rgba(0,0,0,0.12)] transition-shadow duration-300',
        )}
      >
        <header
          className={cn(
            'px-5 py-4 border-b border-gray-100/80 bg-gradient-to-r flex items-center justify-between gap-3',
            meta.gradient,
          )}
        >
          <div className="flex items-center gap-3 min-w-0">
            <span
              className={cn(
                'flex h-8 w-8 items-center justify-center rounded-xl text-xs font-black text-white shrink-0',
                meta.accent,
              )}
            >
              {meta.num}
            </span>
            <h3 className="text-lg font-bold text-gray-900 truncate">
              {section.title}
            </h3>
          </div>
          {meta.tag && (
            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500 shrink-0 rounded-full bg-white/80 px-2.5 py-1 border border-gray-200/60">
              {meta.tag}
            </span>
          )}
        </header>
        <div className="px-5 py-5 md:px-6 md:py-6">
          <AtsSectionContent blocks={section.blocks} sectionKey={section.key} />
        </div>
      </article>
    </ScrollReveal>
  )
}

export default AtsResultSection

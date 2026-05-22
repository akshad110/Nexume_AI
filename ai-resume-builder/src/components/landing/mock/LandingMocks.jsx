import React from 'react'
import { cn } from '@/lib/utils'

export function MockResumeEditor() {
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-lg text-[10px]">
      <div className="flex gap-2 mb-3">
        <div className="h-2 w-16 rounded-full bg-violet-500" />
        <div className="h-2 w-10 rounded-full bg-gray-200" />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5 rounded-lg bg-gray-50 p-2 border border-gray-100">
          <div className="h-1.5 w-full bg-gray-200 rounded" />
          <div className="h-1.5 w-4/5 bg-gray-200 rounded" />
          <div className="h-1.5 w-full bg-gray-200 rounded" />
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-2 min-h-[100px]">
          <div className="h-1 w-8 bg-violet-400 rounded mb-2" />
          <div className="h-1 w-full bg-gray-100 rounded mb-1" />
          <div className="h-1 w-full bg-gray-100 rounded mb-1" />
          <div className="h-1 w-3/4 bg-gray-100 rounded" />
        </div>
      </div>
    </div>
  )
}

export function MockAtsPanel() {
  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-4 shadow-lg">
      <div className="flex justify-between items-center mb-3">
        <span className="text-xs font-bold text-gray-900">ATS Report</span>
        <span className="text-[10px] text-emerald-600 font-semibold">Live</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="relative h-14 w-14 rounded-full border-4 border-emerald-400 flex items-center justify-center">
          <span className="text-sm font-black text-gray-900">78</span>
        </div>
        <div className="flex-1 space-y-1.5">
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-[78%] bg-emerald-400 rounded-full" />
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-[55%] bg-amber-300 rounded-full" />
          </div>
          <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full w-[90%] bg-violet-400 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  )
}

export function MockJobList() {
  const rows = [
    { role: 'Full Stack Dev', status: 'Matched', ok: true },
    { role: 'Frontend Engineer', status: 'Review', ok: false },
    { role: 'Software Intern', status: 'Matched', ok: true },
  ]
  return (
    <div className="rounded-xl bg-white/90 border border-white/50 p-3 shadow-md text-[10px]">
      {rows.map((r) => (
        <div
          key={r.role}
          className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0"
        >
          <span className="font-semibold text-gray-800">{r.role}</span>
          <span
            className={cn(
              'px-2 py-0.5 rounded-full font-bold',
              r.ok ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700',
            )}
          >
            {r.status}
          </span>
        </div>
      ))}
    </div>
  )
}

export function MockScoreWidget({ score = 80 }) {
  return (
    <div className="rounded-2xl bg-white/95 backdrop-blur border border-white/20 p-4 shadow-2xl w-[140px]">
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider">
        Resume match
      </p>
      <p className="text-3xl font-black text-gray-900 mt-1">{score}%</p>
      <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-full"
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  )
}

export function MockTemplatePicker() {
  return (
    <div className="flex gap-2 justify-center">
      {['#7c3aed', '#171717', '#0f172a'].map((c) => (
        <div
          key={c}
          className="w-12 h-16 rounded-md border-2 border-white shadow-md"
          style={{ background: `linear-gradient(180deg, ${c}22 0%, white 40%)` }}
        >
          <div className="w-1 h-full float-left rounded-l" style={{ background: c }} />
        </div>
      ))}
    </div>
  )
}

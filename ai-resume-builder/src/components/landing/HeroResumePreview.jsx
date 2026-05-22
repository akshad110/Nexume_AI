import React from 'react'
import ResumeDocMock from '@/Dashboard/components/ResumeDocMock'

const STACK = [
  { accent: '#7c3aed', label: 'Classic', transform: 'rotate(-8deg) translate(0, 0)' },
  { accent: '#171717', label: 'Pro', transform: 'rotate(3deg) translate(28px, 12px)' },
  { accent: '#0f172a', label: 'Modern', transform: 'rotate(-2deg) translate(56px, 24px)' },
]

function HeroResumePreview() {
  return (
    <div className="relative w-full max-w-[300px] mx-auto lg:mx-0 lg:ml-auto h-[280px] md:h-[320px]">
      {STACK.map((item, i) => (
        <div
          key={item.label}
          className="absolute top-4 left-0 w-[85%] transition-transform duration-300 ease-out hover:scale-[1.03]"
          style={{ transform: item.transform, zIndex: i + 1 }}
        >
          <ResumeDocMock accent={item.accent} label={item.label} />
        </div>
      ))}
    </div>
  )
}

export default HeroResumePreview

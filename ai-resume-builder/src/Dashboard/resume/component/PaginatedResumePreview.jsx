import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  A4_WIDTH_MM,
  A4_HEIGHT_MM,
  A4_PADDING_V_MM,
  A4_PADDING_H_MM,
  A4_CONTENT_HEIGHT_MM,
  mmToPx,
  getPageCount,
} from '@/lib/a4Page'

function A4PageShell({ children, className, id, pageIndex, pageCount, forExport }) {
  return (
    <div
      id={id}
      data-resume-page={pageIndex}
      className={cn(
        'resume-a4-export resume-export mx-auto bg-white shadow-lg',
        forExport ? 'shadow-none' : 'mb-6',
        className,
      )}
      style={{
        width: `${A4_WIDTH_MM}mm`,
        height: `${A4_HEIGHT_MM}mm`,
        maxWidth: '100%',
        padding: `${A4_PADDING_V_MM}mm ${A4_PADDING_H_MM}mm`,
        boxSizing: 'border-box',
        color: '#000000',
        background: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {children}
      {!forExport && pageCount > 1 && (
        <span
          className="absolute bottom-2 right-3 text-[9px] text-gray-400 select-none"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          Page {pageIndex + 1} of {pageCount}
        </span>
      )}
    </div>
  )
}

function PaginatedResumePreview({ children, forExport = false, className }) {
  const measureRef = useRef(null)
  const pageStripRefs = useRef([])
  const [pageCount, setPageCount] = useState(1)
  const contentAreaPx = mmToPx(A4_CONTENT_HEIGHT_MM)
  const innerWidthMm = A4_WIDTH_MM - A4_PADDING_H_MM * 2

  const measure = useCallback(() => {
    if (!measureRef.current) return
    setPageCount(getPageCount(measureRef.current.scrollHeight))
  }, [])

  useLayoutEffect(() => {
    measure()
    const observer = new ResizeObserver(measure)
    if (measureRef.current) observer.observe(measureRef.current)
    return () => observer.disconnect()
  }, [children, measure])

  useLayoutEffect(() => {
    if (!measureRef.current) return
    const html = measureRef.current.innerHTML
    pageStripRefs.current.forEach((strip, pageIndex) => {
      if (!strip) return
      if (strip.innerHTML !== html) strip.innerHTML = html
      strip.style.transform = `translateY(-${pageIndex * contentAreaPx}px)`
    })
  }, [children, pageCount, contentAreaPx])

  useLayoutEffect(() => {
    if (document.fonts?.ready) {
      document.fonts.ready.then(measure)
    }
  }, [children, measure])

  return (
    <div
      className={cn(
        'flex flex-col items-center w-full',
        !forExport && 'scale-[0.85] origin-top lg:scale-100',
        className,
      )}
    >
      {/* Single React tree for measurement */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          left: -9999,
          top: 0,
          visibility: 'hidden',
          pointerEvents: 'none',
          width: `${innerWidthMm}mm`,
        }}
      >
        <div ref={measureRef}>{children}</div>
      </div>

      {Array.from({ length: pageCount }).map((_, pageIndex) => (
        <A4PageShell
          key={pageIndex}
          pageIndex={pageIndex}
          pageCount={pageCount}
          forExport={forExport}
          id={forExport && pageIndex === 0 ? 'resume-pdf-preview' : undefined}
        >
          <div
            style={{
              height: `${A4_CONTENT_HEIGHT_MM}mm`,
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            <div
              ref={(el) => {
                pageStripRefs.current[pageIndex] = el
              }}
            />
          </div>
        </A4PageShell>
      ))}
    </div>
  )
}

export default PaginatedResumePreview

import React, { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'
import {
  A4_WIDTH_MM,
  A4_HEIGHT_MM,
  A4_PADDING_V_MM,
  A4_PADDING_H_MM,
  A4_CONTENT_HEIGHT_MM,
  measureContentHeight,
  readMmSizePx,
  getPageCount,
} from '@/lib/a4Page'

const PAGE_GAP_PX = 32

const pageShellStyle = {
  width: `${A4_WIDTH_MM}mm`,
  height: `${A4_HEIGHT_MM}mm`,
  maxWidth: '100%',
  padding: `${A4_PADDING_V_MM}mm ${A4_PADDING_H_MM}mm`,
  boxSizing: 'border-box',
}

function A4PageShell({ children, className, id, pageIndex, pageCount, forExport }) {
  return (
    <div
      id={id}
      data-resume-page={pageIndex}
      className={cn(
        'resume-a4-export resume-export shrink-0 bg-white shadow-lg',
        forExport ? 'shadow-none' : 'shadow-md',
        className,
      )}
      style={{
        ...pageShellStyle,
        color: '#000000',
        background: '#ffffff',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {children}
      {!forExport && pageCount > 1 && (
        <span
          data-pdf-hide
          className="absolute bottom-2 right-3 text-[9px] text-gray-400 select-none z-10"
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
  const viewportRef = useRef(null)
  const containerRef = useRef(null)
  const pageStripRefs = useRef([])
  const sliceHeightPxRef = useRef(readMmSizePx(A4_CONTENT_HEIGHT_MM, 'height'))
  const [pageCount, setPageCount] = useState(1)
  const [fitScale, setFitScale] = useState(1)

  const pageWidthPx = readMmSizePx(A4_WIDTH_MM, 'width')
  const pageHeightPx = readMmSizePx(A4_HEIGHT_MM, 'height')
  const scaledLayoutHeight =
    pageCount * pageHeightPx + Math.max(0, pageCount - 1) * PAGE_GAP_PX

  const syncPageStrips = useCallback((count = pageCount) => {
    const source = measureRef.current
    if (!source) return
    const html = source.innerHTML
    const slice = sliceHeightPxRef.current
    for (let pageIndex = 0; pageIndex < count; pageIndex += 1) {
      const strip = pageStripRefs.current[pageIndex]
      if (!strip) continue
      strip.innerHTML = html
      strip.style.transform = `translate3d(0, -${pageIndex * slice}px, 0)`
      strip.style.width = '100%'
    }
  }, [pageCount])

  const updatePagination = useCallback(() => {
    const measureEl = measureRef.current
    if (!measureEl) return

    if (viewportRef.current?.clientHeight > 0) {
      sliceHeightPxRef.current = viewportRef.current.clientHeight
    } else {
      sliceHeightPxRef.current = readMmSizePx(A4_CONTENT_HEIGHT_MM, 'height')
    }

    const contentHeight = measureContentHeight(measureEl)
    const slicePx = sliceHeightPxRef.current
    const nextCount = Math.max(1, getPageCount(contentHeight, slicePx))

    setPageCount((prev) => {
      if (prev !== nextCount) return nextCount
      return prev
    })
    syncPageStrips(nextCount)
  }, [syncPageStrips])

  const attachPageStrip = useCallback((pageIndex, el) => {
    pageStripRefs.current[pageIndex] = el
    if (!el || !measureRef.current) return
    el.innerHTML = measureRef.current.innerHTML
    el.style.transform = `translate3d(0, -${pageIndex * sliceHeightPxRef.current}px, 0)`
    el.style.width = '100%'
  }, [])

  const updateFitScale = useCallback(() => {
    if (forExport) {
      setFitScale(1)
      return
    }
    const container = containerRef.current
    if (!container) return
    const available = container.clientWidth
    if (available <= 0) return
    const next = Math.min(1, (available - 4) / pageWidthPx)
    setFitScale((prev) => (Math.abs(prev - next) > 0.01 ? next : prev))
  }, [forExport, pageWidthPx])

  useLayoutEffect(() => {
    updatePagination()

    const measureEl = measureRef.current
    if (!measureEl) return undefined

    const observer = new ResizeObserver(() => updatePagination())
    observer.observe(measureEl)

    const mutationObserver = new MutationObserver(() => updatePagination())
    mutationObserver.observe(measureEl, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
    })

    const t1 = requestAnimationFrame(() => {
      requestAnimationFrame(updatePagination)
    })
    const t2 = window.setTimeout(updatePagination, 50)
    const t3 = window.setTimeout(updatePagination, 250)

    let cancelled = false
    if (document.fonts?.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) updatePagination()
      })
    }

    return () => {
      cancelled = true
      cancelAnimationFrame(t1)
      window.clearTimeout(t2)
      window.clearTimeout(t3)
      observer.disconnect()
      mutationObserver.disconnect()
    }
  }, [children, updatePagination])

  useLayoutEffect(() => {
    syncPageStrips(pageCount)
  }, [pageCount, syncPageStrips])

  useLayoutEffect(() => {
    updateFitScale()
    const container = containerRef.current
    if (!container) return undefined
    const ro = new ResizeObserver(updateFitScale)
    ro.observe(container)
    return () => ro.disconnect()
  }, [updateFitScale, pageCount])

  const scale = forExport ? 1 : fitScale

  const measureLayer = (
    <div
      aria-hidden
      style={{
        ...pageShellStyle,
        position: 'fixed',
        left: -20000,
        top: 0,
        opacity: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: -1,
      }}
    >
      <div ref={measureRef}>{children}</div>
    </div>
  )

  const pages = Array.from({ length: pageCount }).map((_, pageIndex) => (
    <A4PageShell
      key={`page-${pageIndex}-${pageCount}`}
      pageIndex={pageIndex}
      pageCount={pageCount}
      forExport={forExport}
      id={forExport && pageIndex === 0 ? 'resume-pdf-preview' : undefined}
    >
      <div
        ref={pageIndex === 0 ? viewportRef : undefined}
        data-resume-viewport
        style={{
          height: `${A4_CONTENT_HEIGHT_MM}mm`,
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <div
          ref={(el) => attachPageStrip(pageIndex, el)}
          style={{
            position: 'relative',
            willChange: 'transform',
          }}
        />
      </div>
    </A4PageShell>
  ))

  if (forExport) {
    return (
      <div className="w-full" data-resume-preview-root>
        {measureLayer}
        <div className={cn('flex flex-col items-center gap-0', className)}>
          {pages}
        </div>
      </div>
    )
  }

  return (
    <div ref={containerRef} className="w-full min-w-0 max-w-full overflow-x-hidden">
      {measureLayer}

      <div
        className="relative mx-auto overflow-hidden"
        style={{
          width: pageWidthPx * scale,
          height: scaledLayoutHeight * scale,
        }}
      >
        <div
          className={cn('flex flex-col items-center gap-8 py-2', className)}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: pageWidthPx,
            transform: scale < 1 ? `scale(${scale})` : undefined,
            transformOrigin: 'top left',
          }}
        >
          {pages}
        </div>
      </div>
    </div>
  )
}

export default PaginatedResumePreview

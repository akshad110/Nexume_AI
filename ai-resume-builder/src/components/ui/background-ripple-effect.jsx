import { useEffect, useMemo, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

export function BackgroundRippleEffect({ cols = 36, className }) {
  const containerRef = useRef(null)
  const [clickedCell, setClickedCell] = useState(null)
  const [rippleKey, setRippleKey] = useState(0)
  const [dims, setDims] = useState({ rows: 12, cols, cell: 40 })

  useEffect(() => {
    const el = containerRef.current
    if (!el) return undefined

    const update = () => {
      const width = el.clientWidth
      const height = el.clientHeight
      const cell = width / cols
      const rows = Math.max(1, Math.ceil(height / cell))
      setDims({ rows, cols, cell })
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    return () => observer.disconnect()
  }, [cols])

  return (
    <div
      ref={containerRef}
      className={cn('absolute inset-0 overflow-hidden bg-white', className)}
    >
      <DivGrid
        key={`base-${rippleKey}-${dims.rows}`}
        rows={dims.rows}
        cols={dims.cols}
        cell={dims.cell}
        clickedCell={clickedCell}
        onCellClick={(row, col) => {
          setClickedCell({ row, col })
          setRippleKey((k) => k + 1)
        }}
        interactive
      />
    </div>
  )
}

function DivGrid({
  rows = 12,
  cols = 36,
  cell = 40,
  clickedCell = null,
  onCellClick = () => {},
  interactive = true,
}) {
  const cells = useMemo(
    () => Array.from({ length: rows * cols }, (_, idx) => idx),
    [rows, cols],
  )

  const gridStyle = {
    display: 'grid',
    width: '100%',
    height: `${rows * cell}px`,
    gridTemplateColumns: `repeat(${cols}, ${cell}px)`,
    gridTemplateRows: `repeat(${rows}, ${cell}px)`,
  }

  return (
    <div className="relative" style={gridStyle}>
      {cells.map((idx) => {
        const rowIdx = Math.floor(idx / cols)
        const colIdx = idx % cols
        const distance = clickedCell
          ? Math.hypot(clickedCell.row - rowIdx, clickedCell.col - colIdx)
          : 0
        const delay = clickedCell ? Math.max(0, distance * 40) : 0
        const duration = 160 + distance * 60

        const style = clickedCell
          ? {
              '--delay': `${delay}ms`,
              '--duration': `${duration}ms`,
            }
          : {}

        return (
          <div
            key={idx}
            className={cn(
              'box-border border-[0.5px] border-[#e5e7eb] bg-white',
              interactive && 'cursor-pointer hover:bg-[#f9fafb]',
              clickedCell && 'animate-cell-ripple [animation-fill-mode:none]',
              !interactive && 'pointer-events-none',
            )}
            style={style}
            onClick={
              interactive ? () => onCellClick?.(rowIdx, colIdx) : undefined
            }
          />
        )
      })}
    </div>
  )
}

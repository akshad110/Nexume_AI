import { cn } from '@/lib/utils'
import {
  ArrowRight,
  Code2,
  Copy,
  FileDown,
  LayoutTemplate,
  Rocket,
  ScanSearch,
  Zap,
} from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'

const CODE_BLOCK_WIDTHS = [72, 88, 65, 95, 78, 84]
const CODE_BLOCK_MARGINS = [0, 8, 4, 12, 2, 10]

const FEATURE_ICONS = [Copy, Code2, Rocket, Zap]

function CardFlip({
  title = 'Build MVPs Fast',
  subtitle = 'Launch your idea in record time',
  description = 'Copy, paste, customize—and launch your MVP faster than ever with our developer-first component library.',
  features = [
    'Copy & Paste Ready',
    'Developer-First',
    'MVP Optimized',
    'Zero Setup Required',
  ],
  color = '#9f5bff',
  frontContent = null,
  ctaHref = '/auth/sign-in',
  ctaLabel = 'Start for free',
  frontIcon: FrontIcon = Rocket,
}) {
  const [isFlipped, setIsFlipped] = useState(false)
  const accent = color ?? '#9f5bff'

  const codeBlocks = useMemo(
    () =>
      CODE_BLOCK_WIDTHS.map((width, i) => ({
        width: `${width}%`,
        marginLeft: `${CODE_BLOCK_MARGINS[i]}%`,
        delay: `${i * 0.2}s`,
      })),
    [],
  )

  return (
    <div
      style={{ '--card-accent': accent }}
      className="group relative mx-auto h-[360px] w-full max-w-[300px] [perspective:2000px]"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
    >
      <div
        className={cn(
          'relative h-full w-full [transform-style:preserve-3d] transition-all duration-700',
          isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]',
        )}
      >
        {/* Front */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 shadow-lg transition-all duration-700',
            '[transform:rotateY(0deg)] [backface-visibility:hidden]',
            'group-hover:shadow-xl group-hover:border-[color-mix(in_srgb,var(--card-accent)_20%,transparent)]',
            isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--card-accent)_8%,transparent)] via-transparent to-blue-500/5" />

          <div className="absolute inset-0 flex items-center justify-center pt-16 pb-24">
            {frontContent ? (
              <div className="scale-90 px-4">{frontContent}</div>
            ) : (
              <div className="relative flex h-[100px] w-[200px] flex-col items-center justify-center gap-2">
                {codeBlocks.map((block, i) => (
                  <div
                    key={i}
                    className="animate-card-flip-slide-in h-3 w-full rounded-sm bg-gradient-to-r from-[color-mix(in_srgb,var(--card-accent)_25%,transparent)] via-[color-mix(in_srgb,var(--card-accent)_35%,transparent)] to-[color-mix(in_srgb,var(--card-accent)_25%,transparent)] opacity-0"
                    style={{
                      width: block.width,
                      marginLeft: block.marginLeft,
                      animationDelay: block.delay,
                    }}
                  />
                ))}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[var(--card-accent)] via-[color-mix(in_srgb,var(--card-accent)_90%,white)] to-[color-mix(in_srgb,var(--card-accent)_80%,white)] shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-12 [box-shadow:0_10px_25px_-5px_color-mix(in_srgb,var(--card-accent)_40%,transparent)]">
                    <FrontIcon className="h-6 w-6 text-white" />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-zinc-900 transition-all duration-500 ease-out group-hover:-translate-y-1">
                  {title}
                </h3>
                <p className="line-clamp-2 text-sm tracking-tight text-zinc-600 transition-all delay-[50ms] duration-500 ease-out group-hover:-translate-y-1">
                  {subtitle}
                </p>
              </div>
              <Zap className="h-5 w-5 text-[var(--card-accent)] transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
            </div>
          </div>
        </div>

        {/* Back */}
        <div
          className={cn(
            'absolute inset-0 flex h-full w-full flex-col rounded-2xl border border-slate-200 bg-gradient-to-br from-white via-slate-50 to-slate-100 p-5 shadow-lg transition-all duration-700',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'group-hover:shadow-xl group-hover:border-[color-mix(in_srgb,var(--card-accent)_20%,transparent)]',
            !isFlipped ? 'opacity-0' : 'opacity-100',
          )}
        >
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[color-mix(in_srgb,var(--card-accent)_8%,transparent)] via-transparent to-blue-500/5" />

          <div className="relative z-10 flex-1 space-y-5">
            <div className="space-y-2">
              <div className="mb-2 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[var(--card-accent)] to-[color-mix(in_srgb,var(--card-accent)_80%,white)]">
                  <FrontIcon className="h-4 w-4 text-white" />
                </div>
                <h3 className="text-lg font-semibold leading-snug tracking-tight text-zinc-900">
                  {title}
                </h3>
              </div>
              <p className="line-clamp-3 text-sm tracking-tight text-zinc-600">
                {description}
              </p>
            </div>

            <div className="space-y-2.5">
              {features.map((feature, index) => {
                const IconComponent = FEATURE_ICONS[index % FEATURE_ICONS.length]
                return (
                  <div
                    key={feature}
                    className="flex items-center gap-3 text-sm text-zinc-700 transition-all duration-500"
                    style={{
                      transform: isFlipped ? 'translateX(0)' : 'translateX(-10px)',
                      opacity: isFlipped ? 1 : 0,
                      transitionDelay: `${index * 100 + 200}ms`,
                    }}
                  >
                    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-[color-mix(in_srgb,var(--card-accent)_12%,transparent)]">
                      <IconComponent className="h-3 w-3 text-[var(--card-accent)]" />
                    </div>
                    <span className="font-medium">{feature}</span>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="relative z-10 mt-auto border-t border-slate-200 pt-4">
            <Link
              to={ctaHref}
              className="group/start flex items-center justify-between rounded-lg border border-transparent bg-slate-100 p-2.5 transition-all duration-300 hover:scale-[1.02] hover:border-[color-mix(in_srgb,var(--card-accent)_20%,transparent)] hover:bg-[color-mix(in_srgb,var(--card-accent)_8%,transparent)]"
            >
              <span className="text-sm font-semibold text-zinc-900 transition-colors duration-300 group-hover/start:text-[var(--card-accent)]">
                {ctaLabel}
              </span>
              <ArrowRight className="h-4 w-4 text-[var(--card-accent)] transition-all duration-300 group-hover/start:translate-x-1 group-hover/start:scale-110" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardFlip
export { LayoutTemplate, ScanSearch, FileDown }

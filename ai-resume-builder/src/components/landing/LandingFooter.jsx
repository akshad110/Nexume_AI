import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/react'
import ScrollReveal from './ScrollReveal'
import BrandLogo from '@/components/brand/BrandLogo'
import { BRAND_NAME } from '@/config/brand'

const PRODUCT_LINKS = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'ATS scan', to: '/ats-checker' },
  { label: 'Generate with AI', to: '/generate-with-ai' },
  { label: 'Create resume', to: '/auth/sign-in' },
]

const RESOURCE_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#process' },
  { label: 'Home', to: '/' },
  { label: 'Sign in', to: '/auth/sign-in' },
]

function FooterLink({ item }) {
  const className =
    'text-gray-400 hover:text-white transition-colors text-sm font-medium inline-flex items-center gap-1 group'

  const inner = (
    <span className="group-hover:translate-x-0.5 transition-transform duration-200">
      {item.label}
    </span>
  )

  if (item.href) {
    return (
      <a href={item.href} className={className}>
        {inner}
      </a>
    )
  }

  return (
    <Link to={item.to} className={className}>
      {inner}
    </Link>
  )
}

const HIGHLIGHTS = [
  '3 professional templates',
  'Live A4 preview',
  'ATS job match scan',
  'One-click PDF export',
]

function LandingFooter() {
  const year = new Date().getFullYear()
  const { isSignedIn } = useUser()
  const startHref = isSignedIn ? '/dashboard' : '/auth/sign-in'

  return (
    <footer className="relative mt-auto overflow-hidden bg-gray-950 text-white">
      {/* Gradient glow */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-30 blur-[100px]"
        style={{
          background:
            'radial-gradient(ellipse, rgba(159, 91, 255, 0.5) 0%, rgba(56, 189, 248, 0.3) 40%, transparent 70%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 pt-16 md:pt-20 pb-8">
        {/* CTA band */}
        <ScrollReveal>
          <div className="rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm px-8 py-10 md:px-12 md:py-12 flex flex-col md:flex-row md:items-center md:justify-between gap-8 mb-16 md:mb-20">
            <div className="max-w-lg">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-violet-300 mb-3">
                Get started
              </p>
              <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight leading-tight">
                Your next application deserves a resume that{' '}
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
                  gets seen
                </span>
              </h2>
              <p className="mt-3 text-gray-400 text-sm leading-relaxed">
                Build, scan against job posts, and download — free to start.
              </p>
            </div>
            <Link
              to={startHref}
              className="inline-flex justify-center items-center shrink-0 rounded-2xl bg-white text-gray-900 font-bold text-sm px-8 py-4 hover:bg-gray-100 shadow-xl shadow-violet-500/10 transition-all hover:-translate-y-0.5"
            >
              {isSignedIn ? 'Open workspace' : 'Start free →'}
            </Link>
          </div>
        </ScrollReveal>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-14 border-b border-white/10">
          <ScrollReveal className="lg:col-span-5">
            <BrandLogo
              size="xl"
              linkTo="/"
              className="group-hover:opacity-90 transition-opacity"
            />
            <p className="mt-5 text-gray-400 text-sm leading-relaxed max-w-sm">
              The resume workspace for serious job seekers. Structured templates,
              instant ATS feedback, and print-ready PDFs — without the clutter.
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2">
              {HIGHLIGHTS.map((item) => (
                <li
                  key={item}
                  className="text-xs text-gray-500 flex items-center gap-2"
                >
                  <span className="h-1 w-1 rounded-full bg-violet-400 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal delay={100} className="lg:col-span-3 lg:col-start-7">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">
              Product
            </p>
            <nav className="flex flex-col gap-3.5">
              {PRODUCT_LINKS.map((link) => (
                <FooterLink key={link.label} item={link} />
              ))}
            </nav>
          </ScrollReveal>

          <ScrollReveal delay={180} className="lg:col-span-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">
              Explore
            </p>
            <nav className="flex flex-col gap-3.5">
              {RESOURCE_LINKS.map((link) => (
                <FooterLink key={link.label} item={link} />
              ))}
            </nav>
          </ScrollReveal>

          <ScrollReveal delay={260} className="lg:col-span-2">
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500 mb-5">
              Status
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-emerald-400">
                  All systems operational
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                ATS API hosted on Render. Scans may take a moment on first request.
              </p>
            </div>
          </ScrollReveal>
        </div>

        {/* Bottom bar */}
        <ScrollReveal delay={80}>
          <div className="pt-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p className="text-xs text-gray-500">
              © {year} {BRAND_NAME}. All rights reserved.
            </p>
            <p className="text-xs text-gray-600">
              Resume builder · ATS checker · PDF export
            </p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  )
}

export default LandingFooter

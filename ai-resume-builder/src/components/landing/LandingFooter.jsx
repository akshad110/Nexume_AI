import React from 'react'
import { Link } from 'react-router-dom'
import { useUser } from '@clerk/react'
import { ExternalLink, FileText, Globe, ScanSearch, Share2, Sparkles } from 'lucide-react'
import BrandLogo from '@/components/brand/BrandLogo'
import { BRAND_NAME } from '@/config/brand'
import {
  FooterBackgroundGradient,
  TextHoverEffect,
} from '@/components/ui/hover-footer'

const PRODUCT_LINKS = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'ATS scan', to: '/ats-checker' },
  { label: 'Generate with AI', to: '/generate-with-ai' },
  { label: 'Create resume', to: '/auth/sign-in' },
]

const EXPLORE_LINKS = [
  { label: 'Features', href: '/#features' },
  { label: 'How it works', href: '/#process' },
  { label: 'Home', to: '/' },
  { label: 'Sign in', to: '/auth/sign-in' },
]

const FOOTER_SECTIONS = [
  {
    title: 'Product',
    links: PRODUCT_LINKS,
  },
  {
    title: 'Explore',
    links: EXPLORE_LINKS,
  },
]

function FooterNavLink({ item }) {
  const className = 'text-gray-400 hover:text-[#3ca2fa] transition-colors text-sm'

  if (item.href) {
    return (
      <a href={item.href} className={className}>
        {item.label}
      </a>
    )
  }

  return (
    <Link to={item.to} className={className}>
      {item.label}
    </Link>
  )
}

function LandingFooter() {
  const year = new Date().getFullYear()
  const { isSignedIn } = useUser()
  const startHref = isSignedIn ? '/dashboard' : '/auth/sign-in'

  const contactInfo = [
    {
      icon: <Sparkles size={18} className="text-[#3ca2fa] shrink-0" />,
      text: isSignedIn ? 'Open your workspace' : 'Start free today',
      to: startHref,
    },
    {
      icon: <ScanSearch size={18} className="text-[#3ca2fa] shrink-0" />,
      text: 'Run an ATS job match scan',
      to: '/ats-checker',
    },
    {
      icon: <FileText size={18} className="text-[#3ca2fa] shrink-0" />,
      text: 'Build a print-ready resume',
      to: '/dashboard',
    },
  ]

  const socialLinks = [
    { icon: <Globe size={20} />, label: 'Website', href: '/' },
    { icon: <Share2 size={20} />, label: 'Share', href: '/#features' },
    { icon: <ExternalLink size={20} />, label: 'ATS checker', href: '/ats-checker' },
  ]

  return (
    <footer className="relative mt-auto w-full shrink-0 overflow-hidden bg-black">
      <div className="relative z-40 mx-auto w-full max-w-7xl px-6 py-12 md:px-10 md:py-14 lg:px-14">
        <div className="grid grid-cols-1 gap-12 pb-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-16">
          <div className="flex flex-col space-y-4">
            <BrandLogo size="lg" linkTo="/" />
            <p className="text-sm leading-relaxed text-gray-400">
              The resume workspace for serious job seekers. Structured templates,
              instant ATS feedback, and print-ready PDFs — without the clutter.
            </p>
          </div>

          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h4 className="mb-6 text-lg font-semibold text-white">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <FooterNavLink item={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h4 className="mb-6 text-lg font-semibold text-white">Get started</h4>
            <ul className="space-y-4">
              {contactInfo.map((item) => (
                <li key={item.text} className="flex items-center space-x-3">
                  {item.icon}
                  <Link
                    to={item.to}
                    className="text-sm text-gray-400 hover:text-[#3ca2fa] transition-colors"
                  >
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <hr className="my-8 border-t border-gray-700" />

        <div className="flex flex-col items-center justify-between space-y-4 text-sm md:flex-row md:space-y-0">
          <div className="flex space-x-6 text-gray-400">
            {socialLinks.map(({ icon, label, href }) => (
              <Link
                key={label}
                to={href}
                aria-label={label}
                className="hover:text-[#3ca2fa] transition-colors"
              >
                {icon}
              </Link>
            ))}
          </div>

          <p className="text-center text-gray-500 md:text-left">
            &copy; {year} {BRAND_NAME}. All rights reserved.
          </p>
        </div>
      </div>

      <div className="-mt-52 hidden h-[28rem] w-full lg:flex lg:pb-0">
        <TextHoverEffect text="NEXUME" className="z-50 w-full" />
      </div>

      <FooterBackgroundGradient />
    </footer>
  )
}

export default LandingFooter

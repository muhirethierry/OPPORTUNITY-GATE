import { Link } from 'react-router-dom'
import { SITE_NAME } from '../../lib/constants'

const footerLinks = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/faq', label: 'FAQ' },
  { to: '/safety', label: 'Safety' },
  { to: '/privacy', label: 'Privacy' },
  { to: '/terms', label: 'Terms' },
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <p className="font-semibold text-brand-800">{SITE_NAME}</p>
        <p className="mt-2 max-w-xl text-sm text-slate-600">
          We help you discover opportunities. We do not guarantee jobs, scholarships or application
          success. Always apply through the official source.
        </p>
        <nav aria-label="Footer" className="mt-6">
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-slate-700 underline-offset-4 hover:underline">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <p className="mt-6 text-xs text-slate-500">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  )
}
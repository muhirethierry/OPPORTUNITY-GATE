import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { SITE_NAME } from '../../lib/constants'

const links = [
  { to: '/explore', label: 'Explore', icon: 'explore' },
  { to: '/explore?category=jobs', label: 'Jobs', icon: 'jobs', category: 'jobs' },
  {
    to: '/explore?category=internships',
    label: 'Internships',
    icon: 'internships',
    category: 'internships',
  },
  {
    to: '/explore?category=scholarships',
    label: 'Scholarships',
    icon: 'scholarships',
    category: 'scholarships',
  },
  { to: '/explore?category=training', label: 'Training', icon: 'training', category: 'training' },
  { to: '/about', label: 'About', icon: 'about' },
  { to: '/faq', label: 'FAQ', icon: 'faq' },
]

type NavIconName = (typeof links)[number]['icon']

function NavIcon({ name }: { name: NavIconName }) {
  const iconContent = {
    explore: (
      <>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.2 4.2M10.8 7.5l2 3.3-3.3 2 1.3-5.3z" />
      </>
    ),
    jobs: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="2" />
        <path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18m-11 0v2h4v-2" />
      </>
    ),
    internships: (
      <>
        <path d="M3 8.5 12 4l9 4.5-9 4.5-9-4.5zM6.5 10.5v5c3.4 2.5 7.6 2.5 11 0v-5M21 9v6" />
        <circle cx="21" cy="17" r="1.5" />
      </>
    ),
    scholarships: (
      <>
        <path d="M4 5.5c2.8-1 5.5-.6 8 1.1v13c-2.5-1.7-5.2-2.1-8-1.1v-13zm16 0c-2.8-1-5.5-.6-8 1.1v13c2.5-1.7 5.2-2.1 8-1.1v-13z" />
        <path d="m17.5 8 .5 1 1 .2-.8.8.2 1.1-.9-.5-.9.5.2-1.1-.8-.8 1.1-.2.4-1z" />
      </>
    ),
    training: (
      <>
        <path d="M4 4.5h11a3 3 0 013 3v12H7a3 3 0 01-3-3v-12zM7 19.5a3 3 0 010-6h11" />
        <path d="M8 8h6M8 11h5" />
      </>
    ),
    about: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 11v5m0-8h.01" />
      </>
    ),
    faq: (
      <>
        <path d="M20 11.5a7.5 7.5 0 01-8 7.5 8.7 8.7 0 01-3.7-.8L4 20l1.2-3.6A7.1 7.1 0 014 11.5 7.5 7.5 0 0112 4a7.5 7.5 0 018 7.5z" />
        <path d="M9.8 9.5a2.3 2.3 0 014.4 1c0 1.5-2.2 1.8-2.2 3.2m0 2h.01" />
      </>
    ),
  }[name]

  return (
    <svg
      aria-hidden="true"
      className="h-[17px] w-[17px] shrink-0"
      fill="none"
      viewBox="0 0 24 24"
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      >
        {iconContent}
      </g>
    </svg>
  )
}

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  function isActive(link: (typeof links)[number]) {
    const category = new URLSearchParams(location.search).get('category')
    if (link.category) {
      return location.pathname === '/explore' && category === link.category
    }
    if (link.to === '/explore') {
      return location.pathname === '/explore' && !category
    }
    return location.pathname === link.to
  }

  function linkClass(link: (typeof links)[number]) {
    return `flex items-center gap-1.5 rounded-lg px-2 py-2 text-[13px] font-medium transition-colors ${
      isActive(link)
        ? 'bg-brand-50 text-brand-800'
        : 'text-slate-700 hover:bg-slate-100 hover:text-brand-800'
    }`
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6"
      >
        <Link to="/" className="text-lg font-bold text-brand-800">
          {SITE_NAME}
        </Link>

        {/* Desktop links */}
        <ul className="hidden items-center gap-0.5 lg:flex">
          {links.map((l) => (
            <li key={l.to}>
              <Link
                to={l.to}
                aria-current={isActive(l) ? 'page' : undefined}
                className={linkClass(l)}
              >
                <NavIcon name={l.icon} />
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 lg:flex">
          <Link
            to="/login"
            className="rounded-md px-4 py-2 text-base font-medium text-slate-700 hover:bg-slate-100"
          >
            Log in
          </Link>
          <Link
            to="/register"
            className="rounded-md bg-brand-700 px-4 py-2 text-base font-semibold text-white hover:bg-brand-800"
          >
            Sign up
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span aria-hidden="true" className="text-2xl leading-none">
            {open ? '✕' : '☰'}
          </span>
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div id="mobile-menu" className="border-t border-slate-200 px-4 pb-4 pt-2 lg:hidden">
          <ul className="grid grid-cols-2 gap-1 sm:grid-cols-3">
            {links.map((l) => (
              <li key={l.to}>
                <Link
                  to={l.to}
                  aria-current={isActive(l) ? 'page' : undefined}
                  className={linkClass(l)}
                  onClick={() => setOpen(false)}
                >
                  <NavIcon name={l.icon} />
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              to="/login"
              onClick={() => setOpen(false)}
              className="rounded-md border border-slate-300 px-4 py-3 text-center font-medium"
            >
              Log in
            </Link>
            <Link
              to="/register"
              onClick={() => setOpen(false)}
              className="rounded-md bg-brand-700 px-4 py-3 text-center font-semibold text-white"
            >
              Sign up
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
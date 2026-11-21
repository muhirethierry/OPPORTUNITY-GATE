import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { SITE_NAME } from '../../lib/constants'

const links = [
  { to: '/explore', label: 'Explore' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `block rounded-md px-3 py-2 text-base font-medium ${
      isActive ? 'bg-brand-50 text-brand-800' : 'text-slate-700 hover:bg-slate-100'
    }`

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
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <li key={l.to}>
              <NavLink to={l.to} className={linkClass}>
                {l.label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-2 md:flex">
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
          className="inline-flex h-11 w-11 items-center justify-center rounded-md text-slate-700 hover:bg-slate-100 md:hidden"
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
        <div id="mobile-menu" className="border-t border-slate-200 px-4 pb-4 pt-2 md:hidden">
          <ul className="space-y-1">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} className={linkClass} onClick={() => setOpen(false)}>
                  {l.label}
                </NavLink>
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
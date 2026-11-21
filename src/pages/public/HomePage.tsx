import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CATEGORIES } from '../../lib/constants'

const steps = [
  { title: 'Create your profile', text: 'Tell us your education, skills and interests.' },
  { title: 'Discover what fits', text: 'Browse and filter opportunities, with clear reasons why they match.' },
  { title: 'Save and prepare', text: 'Bookmark listings and keep track of deadlines.' },
  { title: 'Apply at the source', text: 'Follow the official link to apply with the organization.' },
]

export default function HomePage() {
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    navigate(q ? `/explore?q=${encodeURIComponent(q)}` : '/explore')
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-brand-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          <h1 className="max-w-2xl text-4xl font-bold tracking-tight text-brand-900 sm:text-5xl">
            Find your next opportunity
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-700">
            Jobs, internships, scholarships, training and more for young people in Rwanda, all in one
            place.
          </p>

          <form onSubmit={handleSubmit} role="search" className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row">
            <label htmlFor="home-search" className="sr-only">
              Search opportunities
            </label>
            <input
              id="home-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, organization or skill"
              className="h-12 flex-1 rounded-md border border-slate-300 bg-white px-4 text-base"
            />
            <button
              type="submit"
              className="h-12 rounded-md bg-brand-700 px-6 text-base font-semibold text-white hover:bg-brand-800"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6" aria-labelledby="categories-heading">
        <h2 id="categories-heading" className="text-2xl font-bold">
          Browse by category
        </h2>
        <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <li key={c.slug}>
              <Link
                to={`/explore?category=${c.slug}`}
                className="block rounded-lg border border-slate-200 p-4 font-medium hover:border-brand-700 hover:bg-brand-50"
              >
                {c.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Latest opportunities (empty state until real data exists) */}
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6" aria-labelledby="latest-heading">
        <h2 id="latest-heading" className="text-2xl font-bold">
          Latest opportunities
        </h2>
        <div className="mt-6 rounded-lg border border-dashed border-slate-300 p-8 text-center text-slate-600">
          Approved opportunities will appear here soon.
        </div>
      </section>

      {/* How it works */}
      <section className="bg-slate-50" aria-labelledby="how-heading">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <h2 id="how-heading" className="text-2xl font-bold">
            How it works
          </h2>
          <ol className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-lg bg-white p-5 shadow-sm">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-700 font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-3 font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Trust note + CTA */}
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="rounded-xl bg-brand-900 p-8 text-white">
          <h2 className="text-2xl font-bold">Built on trust</h2>
          <p className="mt-2 max-w-2xl text-brand-100">
            Every listing shows its source. We only mark a listing as verified after it has really been
            checked, and you can report anything that looks wrong.
          </p>
          <Link
            to="/register"
            className="mt-6 inline-block rounded-md bg-white px-6 py-3 font-semibold text-brand-900 hover:bg-brand-50"
          >
            Create a free account
          </Link>
        </div>
      </section>
    </>
  )
}
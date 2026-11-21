import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import EmptyState from '../../components/feedback/EmptyState'
import Pagination from '../../components/ui/Pagination'
import OpportunityCard from '../../features/opportunities/components/OpportunityCard'
import { PAGE_SIZE, SORT_OPTIONS, WORK_MODE_LABELS } from '../../features/opportunities/constants'
import { SAMPLE_OPPORTUNITIES } from '../../features/opportunities/sampleData'
import type { Opportunity } from '../../features/opportunities/types'
import { CATEGORIES } from '../../lib/constants'
import { isExpired } from '../../lib/formatters'

const fieldClass = 'h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-base'
const labelClass = 'mb-1 block text-sm font-medium text-slate-800'

function deadlineKey(o: Opportunity): number {
  if (!o.deadline || isExpired(o.deadline)) return Number.MAX_SAFE_INTEGER
  return new Date(o.deadline).getTime()
}

export default function ExplorePage() {
  const [params, setParams] = useSearchParams()

  const q = params.get('q') ?? ''
  const category = params.get('category') ?? ''
  const mode = params.get('mode') ?? ''
  const sort = params.get('sort') ?? 'newest'
  const requestedPage = Math.max(1, Number(params.get('page')) || 1)

  const [text, setText] = useState(q)
  useEffect(() => {
    setText(q)
  }, [q])

  function updateParam(key: string, value: string) {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    if (key !== 'page') next.delete('page')
    setParams(next)
  }

  function handleSearch(e: FormEvent) {
    e.preventDefault()
    updateParam('q', text.trim())
  }

  function clearFilters() {
    setParams({})
    setText('')
  }

  const filtered = useMemo(() => {
    const term = q.toLowerCase()
    const list = SAMPLE_OPPORTUNITIES.filter((o) => {
      if (category && o.category !== category) return false
      if (mode && o.workMode !== mode) return false
      if (term) {
        const haystack = [o.title, o.organization, o.summary, o.category, ...o.skills]
          .join(' ')
          .toLowerCase()
        if (!haystack.includes(term)) return false
      }
      return true
    })
    return [...list].sort((a, b) =>
      sort === 'deadline'
        ? deadlineKey(a) - deadlineKey(b)
        : b.postedAt.localeCompare(a.postedAt),
    )
  }, [q, category, mode, sort])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const page = Math.min(requestedPage, totalPages)
  const visible = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)
  const hasFilters = Boolean(q || category || mode || sort !== 'newest')

  return (
    <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="text-3xl font-bold tracking-tight">Explore opportunities</h1>

      <p
        role="note"
        className="mt-4 rounded-md border border-amber-300 bg-amber-50 p-3 text-sm text-amber-900"
      >
        These are sample listings used while we build the platform. They are not real opportunities.
      </p>

      <form onSubmit={handleSearch} role="search" className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex-1">
          <label htmlFor="explore-search" className={labelClass}>
            Search
          </label>
          <input
            id="explore-search"
            type="search"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Title, organization or skill"
            className={fieldClass}
          />
        </div>
        <button
          type="submit"
          className="h-11 self-end rounded-md bg-brand-700 px-6 font-semibold text-white hover:bg-brand-800"
        >
          Search
        </button>
      </form>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <label htmlFor="filter-category" className={labelClass}>
            Category
          </label>
          <select
            id="filter-category"
            value={category}
            onChange={(e) => updateParam('category', e.target.value)}
            className={fieldClass}
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c.slug} value={c.slug}>
                {c.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-mode" className={labelClass}>
            Work mode
          </label>
          <select
            id="filter-mode"
            value={mode}
            onChange={(e) => updateParam('mode', e.target.value)}
            className={fieldClass}
          >
            <option value="">Any</option>
            {Object.entries(WORK_MODE_LABELS).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="filter-sort" className={labelClass}>
            Sort by
          </label>
          <select
            id="filter-sort"
            value={sort}
            onChange={(e) => updateParam('sort', e.target.value === 'newest' ? '' : e.target.value)}
            className={fieldClass}
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="button"
            onClick={clearFilters}
            disabled={!hasFilters}
            className="h-11 w-full rounded-md border border-slate-300 px-4 font-medium hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Clear filters
          </button>
        </div>
      </div>

      <p aria-live="polite" className="mt-6 text-sm text-slate-600">
        {filtered.length} {filtered.length === 1 ? 'opportunity' : 'opportunities'} found
      </p>

      {visible.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="No opportunities match your search"
            text="Try a different keyword or remove some filters."
            action={
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-md bg-brand-700 px-5 py-2 font-semibold text-white hover:bg-brand-800"
              >
                Clear filters
              </button>
            }
          />
        </div>
      ) : (
        <ul className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visible.map((o) => (
            <li key={o.id}>
              <OpportunityCard opportunity={o} />
            </li>
          ))}
        </ul>
      )}

      <Pagination page={page} totalPages={totalPages} onChange={(p) => updateParam('page', String(p))} />
    </section>
  )
}
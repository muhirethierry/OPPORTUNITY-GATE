import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../../lib/constants'
import { daysLeft, formatDate, isExpired } from '../../../lib/formatters'
import { WORK_MODE_LABELS } from '../constants'
import type { Opportunity } from '../types'

type Props = {
  opportunity: Opportunity
}

export default function OpportunityCard({ opportunity: o }: Props) {
  const categoryLabel = CATEGORIES.find((c) => c.slug === o.category)?.label ?? o.category
  const expired = isExpired(o.deadline)

  let deadlineText = 'No deadline listed'
  if (o.deadline) {
    deadlineText = expired
      ? `Expired on ${formatDate(o.deadline)}`
      : `Deadline: ${formatDate(o.deadline)} (${daysLeft(o.deadline)} days left)`
  }

  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-wrap gap-2 text-xs font-medium">
        <span className="rounded-full bg-brand-100 px-2.5 py-1 text-brand-900">{categoryLabel}</span>
        {o.isSample && (
          <span className="rounded-full bg-amber-100 px-2.5 py-1 text-amber-900">Sample data</span>
        )}
        {expired && (
          <span className="rounded-full bg-slate-200 px-2.5 py-1 text-slate-800">Expired</span>
        )}
      </div>

      <h3 className="mt-3 text-lg font-semibold leading-snug">
        <Link to={`/opportunities/${o.id}`} className="hover:underline">
          {o.title}
        </Link>
      </h3>
      <p className="mt-1 text-sm text-slate-700">{o.organization}</p>

      <p className="mt-3 text-sm text-slate-600">{o.summary}</p>

      <dl className="mt-3 space-y-1 text-sm text-slate-700">
        <div className="flex gap-2">
          <dt className="font-medium">Location:</dt>
          <dd>
            {o.location} ({WORK_MODE_LABELS[o.workMode]})
          </dd>
        </div>
        <div className="flex gap-2">
          <dt className="font-medium">Level:</dt>
          <dd>{o.educationLevel}</dd>
        </div>
      </dl>

      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Skills">
        {o.skills.map((s) => (
          <li key={s} className="rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-700">
            {s}
          </li>
        ))}
      </ul>

      <p className={`mt-auto pt-4 text-sm font-medium ${expired ? 'text-slate-500' : 'text-slate-800'}`}>
        {deadlineText}
      </p>
      <p className="text-xs text-slate-500">
        {o.verified ? 'Verified listing' : 'Not yet verified'}
      </p>
    </article>
  )
}
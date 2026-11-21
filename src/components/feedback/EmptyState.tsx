import type { ReactNode } from 'react'

type Props = {
  title: string
  text: string
  action?: ReactNode
}

export default function EmptyState({ title, text, action }: Props) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 p-10 text-center">
      <h2 className="text-lg font-semibold">{title}</h2>
      <p className="mt-2 text-slate-600">{text}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  )
}
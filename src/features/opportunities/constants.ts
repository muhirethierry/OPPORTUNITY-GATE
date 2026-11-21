import type { WorkMode } from './types'

export const WORK_MODE_LABELS: Record<WorkMode, string> = {
  remote: 'Remote',
  onsite: 'On-site',
  hybrid: 'Hybrid',
}

export const SORT_OPTIONS = [
  { value: 'newest', label: 'Newest first' },
  { value: 'deadline', label: 'Deadline soon' },
] as const

export const PAGE_SIZE = 6
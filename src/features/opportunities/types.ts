import type { CATEGORIES } from '../../lib/constants'

export type CategorySlug = (typeof CATEGORIES)[number]['slug']
export type WorkMode = 'remote' | 'onsite' | 'hybrid'

export type Opportunity = {
  id: string
  title: string
  organization: string
  category: CategorySlug
  location: string
  workMode: WorkMode
  educationLevel: string
  summary: string
  skills: string[]
  deadline: string | null // YYYY-MM-DD
  postedAt: string // YYYY-MM-DD
  compensation: string | null
  sourceUrl: string
  verified: boolean
  isSample: boolean
}
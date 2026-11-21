export function formatDate(iso: string): string {
  return new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function isExpired(deadline: string | null): boolean {
  if (!deadline) return false
  return new Date(`${deadline}T23:59:59`).getTime() < Date.now()
}

export function daysLeft(deadline: string): number {
  const end = new Date(`${deadline}T23:59:59`).getTime()
  return Math.ceil((end - Date.now()) / 86400000)
}
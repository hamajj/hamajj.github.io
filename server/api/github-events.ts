export default defineEventHandler(async () => {
  const username = 'hamajj'

  // Fetch public events from GitHub API
  const events: any[] = []
  for (let page = 1; page <= 3; page++) {
    try {
      const res = await fetch(
        `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`,
        { headers: { 'User-Agent': 'nuxt-app' } }
      )
      if (!res.ok) break
      const data = await res.json()
      if (data.length === 0) break
      events.push(...data)
    } catch {
      break
    }
  }

  // Aggregate events by date for the last 12 months
  const now = new Date()
  const oneYearAgo = new Date(now)
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1)

  const dateCounts: Record<string, number> = {}

  // Initialize all dates with 0
  for (let d = new Date(oneYearAgo); d <= now; d.setDate(d.getDate() + 1)) {
    dateCounts[d.toISOString().split('T')[0]] = 0
  }

  // Count events per day
  for (const event of events) {
    const date = event.created_at?.split('T')[0]
    if (date && dateCounts[date] !== undefined) {
      dateCounts[date]++
    }
  }

  // Find max for level calculation
  const maxCount = Math.max(...Object.values(dateCounts), 1)

  // Convert to contribution array with levels
  const contributions = Object.entries(dateCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([date, count]) => ({
      date,
      count,
      level: count === 0 ? 0 : Math.min(Math.ceil((count / maxCount) * 4), 5),
    }))

  return { contributions }
})

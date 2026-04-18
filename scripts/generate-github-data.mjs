import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = resolve(rootDir, 'data')
const username = process.env.GITHUB_USERNAME || 'hamajj'
const githubToken = process.env.GITHUB_TOKEN

const headers = {
  Accept: 'application/vnd.github+json',
  'User-Agent': `${username}-portfolio-site`,
  ...(githubToken ? { Authorization: `Bearer ${githubToken}` } : {}),
}

const defaultProfile = {
  profile: {
    name: username,
    login: username,
    bio: 'Hobbyist Web & Systems-Level Developer',
    avatar: '',
    html_url: `https://github.com/${username}`,
  },
}

function formatDate(date) {
  return date.toISOString().slice(0, 10)
}

function createEmptyContributions() {
  const today = new Date()
  today.setUTCHours(0, 0, 0, 0)

  return Array.from({ length: 365 }, (_, index) => {
    const date = new Date(today)
    date.setUTCDate(today.getUTCDate() - (364 - index))

    return {
      date: formatDate(date),
      count: 0,
      level: 0,
    }
  })
}

async function fetchJson(url) {
  const response = await fetch(url, { headers })
  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for ${url}`)
  }

  return response.json()
}

async function readJson(filename, fallback) {
  try {
    const raw = await readFile(resolve(dataDir, filename), 'utf8')
    return JSON.parse(raw)
  } catch {
    return fallback
  }
}

async function writeJson(filename, data) {
  await writeFile(resolve(dataDir, filename), `${JSON.stringify(data, null, 2)}\n`)
}

function toProfile(user) {
  return {
    profile: {
      name: user.name ?? username,
      login: user.login ?? username,
      bio: user.bio ?? defaultProfile.profile.bio,
      avatar: user.avatar_url ?? '',
      html_url: user.html_url ?? defaultProfile.profile.html_url,
    },
  }
}

function toRepos(repos) {
  return repos
    .filter((repo) => !repo.fork && !repo.archived)
    .map((repo) => ({
      title: repo.name?.toUpperCase() ?? 'UNKNOWN',
      desc: repo.description ?? 'No description.',
      rank: 'A',
      tags: [repo.language ?? 'UNKNOWN', 'GITHUB'],
      image: null,
      url: repo.html_url,
    }))
}

function toContributions(events) {
  const contributions = createEmptyContributions()
  const counts = Object.fromEntries(
    contributions.map((day) => [day.date, 0]),
  )

  for (const event of events) {
    const date = event.created_at?.slice(0, 10)
    if (date && Object.hasOwn(counts, date)) {
      counts[date] += 1
    }
  }

  const maxCount = Math.max(...Object.values(counts), 1)

  return contributions.map((day) => {
    const count = counts[day.date] ?? 0

    return {
      date: day.date,
      count,
      level: count === 0 ? 0 : Math.min(Math.ceil((count / maxCount) * 4), 5),
    }
  })
}

async function fetchEvents() {
  const events = []

  for (let page = 1; page <= 3; page += 1) {
    try {
      const batch = await fetchJson(
        `https://api.github.com/users/${username}/events/public?per_page=100&page=${page}`,
      )

      if (!Array.isArray(batch) || batch.length === 0) {
        break
      }

      events.push(...batch)
    } catch (error) {
      if (events.length === 0) {
        throw error
      }

      console.warn(`Partial events sync after page ${page - 1}: ${error.message}`)
      break
    }
  }

  return events
}

async function syncFile(filename, producer, fallback) {
  try {
    const nextData = await producer()
    await writeJson(filename, nextData)
    console.log(`Updated data/${filename}`)
    return
  } catch (error) {
    const cachedData = await readJson(filename, fallback)
    await writeJson(filename, cachedData)
    console.warn(`Using cached data/${filename}: ${error.message}`)
  }
}

await mkdir(dataDir, { recursive: true })

await syncFile(
  'github-profile.json',
  async () => toProfile(await fetchJson(`https://api.github.com/users/${username}`)),
  defaultProfile,
)

await syncFile(
  'github-repos.json',
  async () => toRepos(await fetchJson(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated`)),
  [],
)

await syncFile(
  'github-contributions.json',
  async () => toContributions(await fetchEvents()),
  createEmptyContributions(),
)

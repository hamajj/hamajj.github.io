import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const dataDir = resolve(rootDir, 'data')
await loadDotEnv()

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

async function loadDotEnv() {
  try {
    const raw = await readFile(resolve(rootDir, '.env'), 'utf8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue

      const separatorIndex = trimmed.indexOf('=')
      if (separatorIndex === -1) continue

      const key = trimmed.slice(0, separatorIndex).trim()
      let value = trimmed.slice(separatorIndex + 1).trim()
      if (!key || process.env[key] !== undefined) continue

      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }

      process.env[key] = value
    }
  } catch {
    // Deployment platforms provide env vars directly; a local .env is optional.
  }
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

function contributionLevelToNumber(level) {
  return {
    NONE: 0,
    FIRST_QUARTILE: 1,
    SECOND_QUARTILE: 2,
    THIRD_QUARTILE: 3,
    FOURTH_QUARTILE: 4,
  }[level] ?? 0
}

function normalizeContributionCalendar(calendar) {
  return calendar.weeks.flatMap((week) =>
    week.contributionDays.map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: contributionLevelToNumber(day.contributionLevel),
    })),
  )
}

async function fetchContributionCalendar() {
  if (!githubToken) {
    throw new Error('GITHUB_TOKEN is required for the real GitHub contribution calendar')
  }

  const query = `
    query Contributions($login: String!) {
      user(login: $login) {
        contributionsCollection {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables: { login: username } }),
  })

  if (!response.ok) {
    throw new Error(`${response.status} ${response.statusText} for GitHub GraphQL contributions`)
  }

  const data = await response.json()
  if (data.errors?.length) {
    throw new Error(data.errors.map((error) => error.message).join('; '))
  }

  const calendar = data.data?.user?.contributionsCollection?.contributionCalendar
  if (!calendar?.weeks) {
    throw new Error(`No contribution calendar found for ${username}`)
  }

  return normalizeContributionCalendar(calendar)
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
  fetchContributionCalendar,
  createEmptyContributions(),
)

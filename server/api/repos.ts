export default defineEventHandler(async () => {
    const username = 'hamajj'

    const res = await fetch(`https://api.github.com/users/${username}/repos`, {
        headers: { 'User-Agent': 'nuxt-app' }
    })

    if (!res.ok) {
        return { error: true, status: res.status }
    }

    const data = await res.json()

    return data.map((repo: any) => ({
        title: repo.name?.toUpperCase() ?? "UNKNOWN",
        desc: repo.description ?? "No description.",
        rank: "A",
        tags: [repo.language ?? "UNKNOWN", "GITHUB"],
        image: null,
        url: repo.html_url
    }))
})

export default defineEventHandler(async () => {
    const username = 'hamajj';

    const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${username}`, {
            headers: { 'User-Agent': 'nuxt-app' }
        }),
        fetch(`https://api.github.com/users/${username}/repos`, {
            headers: { 'User-Agent': 'nuxt-app' }
        })
    ]);

    if (!userRes.ok || !reposRes.ok) {
        return { error: true, status: Math.max(userRes.status, reposRes.status) };
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    return {
        profile: {
            name: user.name ?? username,
            login: user.login,
            bio: user.bio ?? "No bio available.",
            avatar: user.avatar_url,
            html_url: user.html_url
        },
        repositories: repos.map((repo: any) => ({
            title: repo.name?.toUpperCase() ?? "UNKNOWN",
            desc: repo.description ?? "No description.",
            rank: "A",
            tags: [repo.language ?? "UNKNOWN", "GITHUB"],
            image: null,
            url: repo.html_url
        }))
    };
});

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { spotifyClientId, spotifyClientSecret, spotifyRefreshToken } = config

  // Gracefully return when env vars are missing
  if (!spotifyClientId || !spotifyClientSecret || !spotifyRefreshToken) {
    return { isPlaying: false }
  }

  try {
    // Refresh access token
    const tokenRes = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: spotifyRefreshToken,
      }),
    })

    if (!tokenRes.ok) {
      return { isPlaying: false }
    }

    const { access_token } = await tokenRes.json()

    // Fetch currently playing
    const playerRes = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: { Authorization: `Bearer ${access_token}` },
    })

    if (playerRes.status === 204 || !playerRes.ok) {
      return { isPlaying: false }
    }

    const data = await playerRes.json()

    if (!data.item) {
      return { isPlaying: false }
    }

    return {
      isPlaying: data.is_playing ?? false,
      title: data.item.name,
      artist: data.item.artists?.map((a: any) => a.name).join(', '),
      albumArt: data.item.album?.images?.[0]?.url,
      albumName: data.item.album?.name,
    }
  } catch {
    return { isPlaying: false }
  }
})

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const { spotifyClientId, spotifyClientSecret } = config
  const query = getQuery(event)
  const code = query.code as string

  if (!code) {
    return { error: 'No authorization code provided' }
  }

  if (!spotifyClientId || !spotifyClientSecret) {
    return { error: 'Spotify credentials not configured' }
  }

  try {
    const redirectUri = `${getRequestURL(event).origin}/api/spotify/callback`

    const res = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${spotifyClientId}:${spotifyClientSecret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri: redirectUri,
      }),
    })

    if (!res.ok) {
      return { error: 'Failed to exchange code for token' }
    }

    const data = await res.json()

    return {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      message: 'Save the refresh_token to your SPOTIFY_REFRESH_TOKEN env variable',
    }
  } catch (err) {
    return { error: 'Token exchange failed' }
  }
})

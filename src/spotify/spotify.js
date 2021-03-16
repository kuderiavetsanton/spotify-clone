const spotifyUrl = 'https://accounts.spotify.com/authorize'

const clientId = '0cb7805721224f28a61796ae70134f46'

const redirect_uri = 'http://localhost:3000/'

const scope = [
    "user-read-currently-playing",
    "user-read-recently-played",
    "user-read-playback-state",
    "user-top-read",
    "user-modify-playback-state",
    'app-remote-control',
    'streaming',
    'playlist-modify-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing'
  ].join('%20')


export const loginUrl = `${spotifyUrl}?client_id=${clientId}&redirect_uri=${redirect_uri}&response_type=token&scope=${scope}`

export const getTokenFromUrl = () => {
    return window.location.hash.substring(1).split('&').reduce((initial,pairs) => {
        let part = pairs.split('=')
        initial[part[0]] = decodeURIComponent(part[1])
        return initial
    },{})
}
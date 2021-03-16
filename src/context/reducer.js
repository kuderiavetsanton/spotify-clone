export const initialState = {
    user:null,
    playlists:[],
    playing: false,
    item:null,
    token:null,
    currentPlaylist:null,
    top_arists:null,
    spotify:null,
    device_id:null,
    playlistPlayed:false,
}

export const reducer = (state,action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state,user:action.user}
            break;
        
        case 'SET_PLAYING':
            return {...state,playing:action.playing}
            break;
        case 'SET_ITEM':
            return {...state,item:action.item}
            break;
            
        case 'SET_TOKEN':
            return {...state,token:action.token}
            break;
        case "SET_TOP_ARTISTS":
            return {
                ...state,
                top_artists: action.top_artists,
            };
        case 'SET_PLAYLISTS':
            return {...state,playlists:[...action.playlists]}
            break;
        case 'SET_CURRENT_PLAYLIST':
            return {...state,currentPlaylist:action.currentPlaylist}
            break;
        case 'SET_DEVICE_ID':
            return {...state,device_id:action.device_id}
            break;
            
        case "SET_SPOTIFY":
            return {
                ...state,
                spotify: action.spotify,
            };
        case "SET_PLAYLIST_PLAYED":
        return {
            ...state,
            playlistPlayed: action.playlistPlayed,
        };
        default:
            return state
            break;
    }
}
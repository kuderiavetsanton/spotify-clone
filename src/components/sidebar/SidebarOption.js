import React from 'react'
import './sidebarOption.css'
import { useDataLayerStore } from '../../context/DataLayer'


export default function SidebarOption({title,Icon,playlist}) {
    let [{spotify},dispatch] = useDataLayerStore()
    let handleClick = () => {
        spotify.getPlaylist(playlist.id).then(currentPlaylist => {
            dispatch({type:'SET_CURRENT_PLAYLIST',currentPlaylist})
          })
    }
    return (
        <div className="sidebarOption">
            {Icon && <Icon className="sidebarOption__icon"/>}
            {Icon ?  <h4>{title}</h4> : null}
            {playlist && <p onClick={handleClick}>{playlist.name}</p>}
        </div>
    )
}

import React from 'react'
import { LibraryMusic, Search,Home } from '@material-ui/icons';
import { useDataLayerStore } from '../../context/DataLayer'

import './sidebar.css'
import SidebarOption from './SidebarOption'

export default function Sidebar() {
    const [{playlists}] = useDataLayerStore()
    return (
        <div className="sidebar">
            <img src="https://getheavy.com/wp-content/uploads/2019/12/spotify2019-830x350.jpg" alt="Spotify logo" className="sidebar__logo"/>
            <SidebarOption title="Home page" Icon={Home}/>
            <SidebarOption title="Search" Icon={Search}/>
            <SidebarOption title="Your Libary" Icon={LibraryMusic}/>
            <p>Playlists</p>
            <hr/>
            <div className="playlists">
                {playlists.map(playlist => (
                    <SidebarOption playlist={playlist} />
                ))}
            </div>
            
        </div>
    )
}

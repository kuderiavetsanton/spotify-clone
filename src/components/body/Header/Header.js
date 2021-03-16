import React from 'react'
import './header.css'

import { useDataLayerStore} from '../../../context/DataLayer'
import { Avatar } from '@material-ui/core'
import { Search } from '@material-ui/icons'

export default function Header() {
    let [{user}, dispatch] = useDataLayerStore()
    return (
        <div className="header">
            <div className="header__left">
                <Search/>
                <input type="text" placeholder="Enter name of song,album or artist"/>
            </div>
            <div className="header__right">
                <Avatar src={user ? user.images[0].url : null} alt="User Avatar"/>
                {user ?  <p>{user.display_name}</p>  : null}
            </div>
        </div>
    )
}

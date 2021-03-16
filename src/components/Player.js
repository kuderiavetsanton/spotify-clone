import React from 'react'
import './player.css'
import Sidebar from './sidebar/Sidebar'
import Body from './body/Body'
import Footer from './footer/Footer'

export default function Player() {
    return (
        <div className="player">
            <div className="player__body">
                <Sidebar/>
                <Body/>
            </div>
            <div className="footer">
                <Footer/>
            </div>
        </div>
    )
}

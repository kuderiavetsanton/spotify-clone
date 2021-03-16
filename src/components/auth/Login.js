import React,{ useState,useEffect } from 'react'
import './login.css'
import { loginUrl } from '../../spotify/spotify'

export default function Login() {
    console.log(loginUrl)
    return (
        <div className="login">
            <img src='https://www.howtogeek.com/thumbcache/2/200/2186f6036c40a1c9b53b43eca6594b2b/wp-content/uploads/2020/06/Sptoify-logo-vertical-with-text-on-black.png' alt=""/>
            <a href={loginUrl}>Login to Spotify</a>
        </div>
    )
}

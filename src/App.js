import React, { useState,useEffect } from 'react';
import Login from './components/auth/Login';

import { getTokenFromUrl } from './spotify/spotify'
import SpotifyWebApi from 'spotify-web-api-js'

import { useDataLayerStore } from './context/DataLayer'
import Player from './components/Player';

const spotify = new SpotifyWebApi()
function App() {
  let [{token,skip},dispatch] = useDataLayerStore()
  useEffect( () => {
      let hash = getTokenFromUrl()
      let _token = hash.access_token
      window.location.hash = ''
      if(_token){
          //setting access token
          dispatch({type:'SET_TOKEN',token:_token})
          spotify.setAccessToken(_token)
          //get and set my user data
          spotify.getMe().then(_user => {
            dispatch({type:'SET_USER',user:_user})
          })

          //get and set my playlists
          spotify.getUserPlaylists().then(playlists => {
            playlists = playlists.items
            console.log(playlists)
            dispatch({type:'SET_PLAYLISTS',playlists})
          })
          //get and set wickly playlist
          spotify.getPlaylist('37i9dQZF1E35RkRj2qPLvo').then(currentPlaylist => {
            dispatch({type:'SET_CURRENT_PLAYLIST',currentPlaylist})
          })
          //set spotify
          dispatch({type:'SET_SPOTIFY',spotify})
          //get and set top artists
          spotify.getMyTopArtists().then(top_artists => {
            dispatch({type:'SET_TOP_ARTISTS',top_artists})
          })
          //set Device
          spotify.getMyDevices().then(res => {
            dispatch({type:"SET_DEVICE_ID",device_id:res.devices[0].id})
          }).catch(err => console.log(err))
          //get and set curent track
          spotify.getMyCurrentPlayingTrack().then(res => {
            dispatch({type:'SET_ITEM',item:res.item})
            dispatch({type:'SET_PLAYING',playing:res.is_playing})
          })
          spotify.setVolume(50)
      }
  },[])
  return (
    <div className="app">
        {token ?  <Player/> : <Login />}
    </div>
  );
}

export default App;

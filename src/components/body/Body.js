import React, {useEffect,useState} from 'react'
import './body.css'
import Header from './Header/Header'
import {useDataLayerStore} from '../../context/DataLayer'
import { PlayCircleFilledWhite,FavoriteBorder,MoreHoriz,AccessTime,PauseCircleFilled } from '@material-ui/icons'
import SongRow from './songRow/SongRow'


export default function Body() {
    let [ state,dispatch ] = useDataLayerStore()
    let [ currentPlayed,setCurrentPlayed ] = useState(true)
    let {currentPlaylist,spotify,playing,device_id,item,playlistPlayed } = state
    useEffect(()=> {
      if(currentPlaylist && item){
        let playlistPlayed = (currentPlaylist.tracks.items.findIndex(_item => _item.track.id === item.id)) > -1
        setCurrentPlayed(playlistPlayed)
        dispatch({type:'SET_PLAYLIST_PLAYED',playlistPlayed})
      }
    },[currentPlaylist])
    const playPlaylist = (id) => {
        setCurrentPlayed(true)
        spotify
          .play({
            context_uri: `spotify:playlist:${currentPlaylist.id}`,
            device_id
          })
          .then((res) => {
            spotify.getMyCurrentPlayingTrack().then(r => {
                dispatch({type:'SET_ITEM',item:currentPlaylist.tracks.items[0].track})
                dispatch({type:'SET_PLAYING',playing:true})
                dispatch({type:'SET_PLAYLIST_PLAYED',playlistPlayed:true})
            })
          }).catch(err => console.log(err))
          
      };
      const playPlayer = (id) => {
            spotify.play({device_id}).then((res) => {
                dispatch({type:'SET_PLAYING',playing:!playing})
            }).catch(err => console.log(err))
            
      };
      const pausePlayer = (id) => {
            spotify.pause({device_id}).then((res) => {
                dispatch({type:'SET_PLAYING',playing:!playing})
            }).catch(err => console.log(err)) 
      }
      const playSong = (id) => {
        let trackArrayStartIndex = currentPlaylist.tracks.items.findIndex(item => {
          return item.track.id === id
        })
        let trackArray = currentPlaylist.tracks.items.slice(trackArrayStartIndex).map(element => `spotify:track:${element.track.id}`)
        spotify.play({
          "uris": trackArray
        })
        .then((res) => {
          dispatch({
            type: "SET_PLAYING",
            playing: true,
          });
          dispatch({
            type:'SET_ITEM',
            item:currentPlaylist.tracks.items.find(item => item.track.id === id).track
          })
        });
      };
    return (
        <div className="body">
            <Header/>
            <div className="body__info">
                <img src={currentPlaylist? currentPlaylist.images[0].url : 'https://mooscle.com/app/uploads/2019/08/spotify-418x315.jpg'} alt="weekly"/>
                <div className="body__infoText">
                    <strong>PLAYLIST</strong>
                    <h2>{currentPlaylist?.name}</h2>
                    <p>{currentPlaylist?.description}</p>
                </div>
            </div>
                <div className="body__icons">
                    <div className="filled-white">
                        {currentPlayed && playing  ? 
                          <PauseCircleFilled className="body__start" onClick={pausePlayer}/>
                         : 
                          <PlayCircleFilledWhite className="body__start" onClick={() => {
                            if(!playlistPlayed){
                                playPlaylist()
                            }else{
                                playPlayer()
                            }
                      }}/>
                        }
                    </div>
                    <FavoriteBorder fontSize="large" className="body__icon"/>
                    <MoreHoriz fontSize="large" className="body__icon"/>
                </div>
                <div className="body__songs">
                    <div className="body__columns">
                        <p className="column__track">#&nbsp;&nbsp;&nbsp;&nbsp; title</p>
                        <p>Album</p>
                        <AccessTime/>
                    </div>
                    <hr/>
                    {currentPlaylist?.tracks.items.map((item,itemIndex) => {
                        return <SongRow track={item.track} key={item.track.id} order={itemIndex + 1} playSong={playSong.bind(this,item.track.id)} pausePlayer={pausePlayer}/>
                    })}
                </div>
        </div>
    )
}

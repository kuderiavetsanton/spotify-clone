import React, { useState,useRef } from 'react'
import './footer.css'
import { useDataLayerStore } from '../../context/DataLayer'

import { PlayCircleOutline,SkipPrevious,SkipNext,Shuffle,Repeat,PlaylistPlay,VolumeDown,VolumeUp,PauseCircleFilled,VolumeMute } from '@material-ui/icons'

import { Grid,Slider } from '@material-ui/core'

export default function Footer() {
    let [{ token,item,spotify,playing,currentPlaylist }, dispatch] = useDataLayerStore()
    let slider = useRef(null)
    let [isShuffleActive,setIsShuffleActive] = useState(false)
    let [isRepeatActive,setIsRepeatActive] = useState(false)
    let [value,setValue] = useState(50)
    let playPlayer = () => {
        dispatch({type:'SET_PLAYING',playing:!playing})
        spotify.play()
    }
    let pausePlayer = () => {
        dispatch({type:'SET_PLAYING',playing:!playing})
        spotify.pause()
    }
    let shufflePlayer = ()=> {
        if(!isShuffleActive){
            spotify.setShuffle(true).then(() => setIsShuffleActive(!isShuffleActive)).catch(err => console.log(err))
        }else{
            spotify.setShuffle(false).then(() => setIsShuffleActive(!isShuffleActive)).catch(err => console.log(err))
        }
        
    }
    let repeatPlayer = ()=> {
        if(!isRepeatActive){
            setIsRepeatActive(!isRepeatActive)
            spotify.setRepeat('context').then(() => {
                
            }).catch(err => console.log(err))
        }else{
            setIsRepeatActive(!isRepeatActive)
            spotify.setRepeat('off').then(() => {
                
            }).catch(err => console.log(err))
        }  
    }
    let skipToNext = () => {
        handleSkip(1)
        spotify.skipToNext().catch(err => console.log(err))
        
    }
    let skipToPrevious = () => {
        handleSkip(-1)
        spotify.skipToPrevious().catch(err => console.log(err))
    }
    let setVolume = (e,value) => {
        setValue(value)
        spotify.setVolume(value)
    }
    let handleSkip = (step) => {
        let newItemIndex = currentPlaylist.tracks.items.findIndex(_item => {
            return _item.track.id === item.id
        }) + step
        if(newItemIndex < 0){
            newItemIndex = currentPlaylist.tracks.items.length - 1
        }
        if(newItemIndex > currentPlaylist.tracks.items.length - 1){
            newItemIndex = 0
        }
        dispatch({type:'SET_ITEM',item:currentPlaylist.tracks.items[newItemIndex].track})
    }
    return (
        <div className="footer">
            <div className="footer__left">
                <img src={item && item.album.images[0].url} alt="album logo" className="footer__albumLogo"/>
                <div className="footer__songInfo">
                    <h3 className="footer__songName">{item && item.name}</h3>
                    <p className="footer__authorName">{item && item.artists.map(artist => artist.name).join(', ')}</p>
                </div>
                
            </div>
            <div className="footer__center">
                <div className={isShuffleActive && 'active'}>
                    <Shuffle className="footer__green" onClick={shufflePlayer}/>
                </div>
                <SkipPrevious className="footer__icon" onClick={skipToPrevious}/>
                {playing ? <PauseCircleFilled className="footer__icon" fontSize="large" onClick={pausePlayer}/> : <PlayCircleOutline className="footer__icon" fontSize="large" onClick={playPlayer}/>}
                <SkipNext className="footer__icon" onClick={skipToNext}/>
                <div className={isRepeatActive && 'active'}>
                    <Repeat className="footer__green" onClick={repeatPlayer}/>
                </div>
            </div>
            <div className="footer__right">
            <Grid container spacing={2}>
                <Grid item>
                    <PlaylistPlay />
                </Grid>
                <Grid item>
                    {value === 0 ? <VolumeMute className="pointers"/> : <VolumeDown className="pointers" onClick={() => {
                        setValue(0)
                        spotify.setVolume(0)
                    }}/>}
                </Grid>
                <Grid item xs>
                    <Slider  ref={slider}aria-labelledby="continuous-slider" onChangeCommitted={setVolume} value={value} onChange={(e,value) => setValue(value)}/>
                </Grid>
                <Grid item>
                    <VolumeUp className="pointers" onClick={() => {
                        setValue(100)
                        spotify.setVolume(100)
                    }}/>
                </Grid>
            </Grid>
            </div>
        </div>
    )
}

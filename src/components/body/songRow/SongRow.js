import React, {useEffect,useState} from 'react'
import './songRow.css'
import { useDataLayerStore } from '../../../context/DataLayer'

function SongRow({ track,order,playSong,pausePlayer }) {

    let [{ item,playing }] = useDataLayerStore()
    let [classList,setClassList] = useState("songRow")
    let time;
    if(track){
        time = track.duration_ms / 1000
        let minutes = Math.floor(time / 60)
        let seconds = Math.floor(time % 60)
        if(seconds < 10){
            seconds = '0'+seconds
        }
        time = `${minutes} : ${seconds}`
    }
    useEffect(()=>{
        if(item && track.id === item.id){
            setClassList("songRow active")
        }else{
            setClassList("songRow")
        }
    },[item])
    
    return (
        <div className={classList} onClick={() => {
            if(item && track.id === item.id && playing){
                pausePlayer()
            }else{
                playSong()
            }
        }}>
            <div className="songRow__left">
                <span className="songRow__order">{order && order}</span>
                <img src={track?.album.images[0].url} alt="Album"/>
                <div className="songRow__info">
                    <h1>{track && track.name}</h1>
                    <p>{track && track.artists.map(artist => artist.name).join(', ')}</p>
                </div>
            </div>
            <p className="songRow__album">{track.album.name}</p>
            <p className="songRow__time">{time}</p>
        </div>
    )
}

export default SongRow

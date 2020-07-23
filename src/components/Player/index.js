import React, {useState, useRef, useEffect} from 'react'
import './Player.css'

function usePlayerState($videoPlayer){
    const [playerState, setPlayerState] = useState({
        playing:false,
        percentage:0
    })

    useEffect( () =>{
        playerState.playing ? $videoPlayer.current.play() : $videoPlayer.current.pause()
    }, [
        $videoPlayer,
        playerState.playing
    ])


    function toogleVideoPlay (){
        setPlayerState({
            ...playerState,
            playing:!playerState.playing
        })
    }

    
    function handleTimeUpdate() {
        const currentPercentage = ($videoPlayer.current.currentTime / $videoPlayer.current.duration) *100
        setPlayerState({
            ...playerState,
            percentage:currentPercentage
        })

    }


    function handleChangeVideoPercentage(event){
        const currentPercentageValue = event.target.value
        $videoPlayer.current.currentTime = $videoPlayer.current.duration / 100 * currentPercentageValue

       setPlayerState({
            ...playerState,
            percentage:currentPercentageValue
        })       
    }

    return {
        playerState,
        toogleVideoPlay,
        handleTimeUpdate,
        handleChangeVideoPercentage
    }
}





const videoURL="https://instagram.fmea2-1.fna.fbcdn.net/v/t50.2886-16/106034683_751400472327251_3805287395436138923_n.mp4?_nc_ht=instagram.fmea2-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=8TjvEvjPQ3UAX9j-SI_&oe=5F1A4C92&oh=0eaed3d4e7768f6eeeb53fc47dc1c562"
export default function Player (){
    const $videoPlayer = useRef(null)
    const {
        playerState,
        toogleVideoPlay,
        handleTimeUpdate,
        handleChangeVideoPercentage
    }  = usePlayerState($videoPlayer)


    return (
        <div className="videoWrapper">
            <video
                ref={$videoPlayer}
                src={videoURL}
                poster="https://cdn.dribbble.com/users/2581827/screenshots/13320705/media/3312d4b1007b0abd72ef149ad5b6d05c.gif"
                onTimeUpdate={handleTimeUpdate}
            />
            <div className="controls">
                <button onClick={toogleVideoPlay}>
                    { playerState.playing ? "Pause" : "Play"}
                </button>
                <input
                    type="range"
                    min="0"
                    max="100"
                    onChange={handleChangeVideoPercentage}
                    value={playerState.percentage}
                />
                <select>
                    {[1,2,3].map(speed =>(
                        <option
                            key={`speedChange_${speed}`}
                        >
                           {speed}     
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
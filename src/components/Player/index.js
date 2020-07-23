import React, {useState, useRef, useEffect} from 'react'
import './Player.css'

function usePlayerState($videoPlayer){
    const [playerState, setPlayerState] = useState({
        playing:false,
        percentage:0,
        playbackrate:1
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

    function handlePlaybackRate(event){
        const currentPlaybackRateValue =event.target.value
        $videoPlayer.current.playbackRate = currentPlaybackRateValue 

        setPlayerState({
            ...playerState,
            playbackrate:currentPlaybackRateValue
        })  
        console.log(playerState)      
    }

    return {
        playerState,
        toogleVideoPlay,
        handleTimeUpdate,
        handleChangeVideoPercentage,
        handlePlaybackRate
    }
}





const videoURL="https://instagram.fmea2-1.fna.fbcdn.net/v/t50.2886-16/106034683_751400472327251_3805287395436138923_n.mp4?_nc_ht=instagram.fmea2-1.fna.fbcdn.net&_nc_cat=111&_nc_ohc=8TjvEvjPQ3UAX9j-SI_&oe=5F1A4C92&oh=0eaed3d4e7768f6eeeb53fc47dc1c562"
export default function Player (){
    const $videoPlayer = useRef(null)
    const {
        playerState,
        toogleVideoPlay,
        handleTimeUpdate,
        handleChangeVideoPercentage,
        handlePlaybackRate,
    }  = usePlayerState($videoPlayer)


    return (
        <div className="videoWrapper">
            <video
                ref={$videoPlayer}
                src={videoURL}
                poster="videoPreview.jpg"
                onTimeUpdate={handleTimeUpdate}
                loop={true}
                
                
            />
            <div className="controls">
                <button onClick={toogleVideoPlay}>
                    { playerState.playing ? "Pause" : "Play"}
                </button>

                <input
                    className="slider"
                    type="range"
                    min="0"
                    max="100"
                    onChange={handleChangeVideoPercentage}
                    value={playerState.percentage}
                />
                <label for="playbackrate">Speed:</label>
                <select 
                    className="playbackRate"
                    name="playbackrate"
                    onChange={handlePlaybackRate}
                >
                    {[1,0.1,0.5,2].map(speed =>(
                        <option
                            key={`speedChange_${speed}`}
                            value={speed}
                        >
                           {speed}     
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}
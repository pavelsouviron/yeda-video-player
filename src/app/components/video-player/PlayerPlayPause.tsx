import {usePlayerContext} from '@/app/components/video-player/PlayerContext';
import PlayIcon from '@pub/icons/play.svg';
import PauseIcon from '@pub/icons/pause.svg';

const PlayerPlayPause = () => {
    const {videoRef} = usePlayerContext();
    const video = videoRef?.current;
    const isPaused = video?.paused ?? true;

    const handleClick = () => {
        if (!video) return;
        if (video.paused) {
            video.play();
            return;
        }
        video.pause();
    };

    return (
        <button title="Play/Pause" className="hand" onClick={handleClick}>
            {isPaused ? (<img alt="Play" src={PlayIcon.src}/>) : (<img alt="Pause" src={PauseIcon.src}/>)}
        </button>
    );
};

export default PlayerPlayPause;

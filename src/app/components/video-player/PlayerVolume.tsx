import {usePlayerContext} from '@/app/components/video-player/PlayerContext';
import VolFullIcon from '@pub/icons/vol-full.svg';
import VolMuteIcon from '@pub/icons/vol-mute.svg';

const PlayerVolume = () => {
    const {videoRef} = usePlayerContext();
    const v = videoRef?.current;
    if (!v) return null;
    return (
        <button title="Volume" className={'hand'} onClick={() => v.muted = !v.muted}>
            {!v.muted ? <img alt="Mute" src={VolFullIcon.src}/> : <img alt="Unmute" src={VolMuteIcon.src}/>}
        </button>
    );
};

export default PlayerVolume;

import {usePlayerContext} from '@/app/components/video-player/PlayerContext';
import SettingsIcon from '@pub/icons/settings.svg';

const PlayerSettings = () => {
    const {videoRef} = usePlayerContext();
    const v = videoRef?.current;
    if (!v) return null;
    return (
        <button className={'hand'}>
            <img alt="Settings" src={SettingsIcon.src}/>
        </button>
    );
};

export default PlayerSettings;

import FullScreenIcon from '@pub/icons/full-screen.svg';
import FramedScreenIcon from '@pub/icons/framed-screen.svg';
import {ScreenSizeProps} from '@/app/types/player-types';
import {usePlayerContext} from '@/app/components/video-player/PlayerContext';

const PlayerToggleScreen = (options: ScreenSizeProps) => {
    const {videoRef, handleScreenToggle, screenSizeProps} = usePlayerContext();
    const v = videoRef?.current;
    if (!v) return null;
    return (
        <button className="hand" onClick={()=> handleScreenToggle({videoRef, isFullScreen: screenSizeProps.isFullScreen, setIsFullScreen: screenSizeProps.setIsFullScreen})}>
            {!options.isFullScreen ? <img alt="Full Screen" src={FullScreenIcon.src}/> : <img alt="Framed Screen" src={FramedScreenIcon.src}/>}
        </button>
    );
};

export default PlayerToggleScreen;

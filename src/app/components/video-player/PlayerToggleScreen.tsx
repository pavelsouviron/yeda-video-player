import FullScreenIcon from '@pub/icons/full-screen.svg';
import FramedScreenIcon from '@pub/icons/framed-screen.svg';
import {ScreenSizeProps} from '@/app/types/player-types';
//import {toggleFullscreen} from '@/app/utils/utils';
import {usePlayerContext} from '@/app/components/video-player/PlayerContext';

const PlayerToggleScreen = (options: ScreenSizeProps) => {
    const {videoRef} = usePlayerContext();
    const v = videoRef?.current;
    if (!v) return null;
    const clickHandler = () => {
        //toggleFullscreen(v!);
        options.setIsFullScreen(!options.isFullScreen)
    };
    return (
        <button className="hand" onClick={clickHandler}>
            {!options.isFullScreen ? <img alt="Full Screen" src={FullScreenIcon.src}/> : <img alt="Framed Screen" src={FramedScreenIcon.src}/>}
        </button>
    );
};

export default PlayerToggleScreen;

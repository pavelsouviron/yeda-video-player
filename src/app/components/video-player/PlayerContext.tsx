import {createContext, RefObject, useContext} from 'react';
import {PlayerControllerProps} from '@/app/types/player-types';
import Hls from 'hls.js';

const dummyVideoRef = {current: null} as unknown as RefObject<HTMLVideoElement>;
const dummyHlsRef = {current: null} as unknown as RefObject<Hls>;
const playerContextDefaults = {
    videoRef: dummyVideoRef,
    hlsRef: dummyHlsRef,
    currentTime: 0,
    setCurrentTime: () => {},
    videoLength: 0,
    chapters: [],
    resOptions: [],
    screenSizeProps: {
        isFullScreen: false,
        setIsFullScreen: () => {}
    }
};

export const PlayerContext = createContext<PlayerControllerProps>(playerContextDefaults);

export const usePlayerContext = () => useContext(PlayerContext);

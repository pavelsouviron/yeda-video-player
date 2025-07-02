import {ScreenToggleProps, TimeUpdateProps, VideoKeyControlProps} from "@/app/types/player-types";

const handleTimeUpdate = ({videoRef, setCurrentTime}: TimeUpdateProps) => {
    if (!videoRef.current) return;
    setCurrentTime(videoRef.current.currentTime);
};

const handleScreenToggle = ({videoRef, isFullScreen, setIsFullScreen}: ScreenToggleProps) => {
    const v = videoRef?.current;
    if (!v) return;
    const container = v?.parentElement;
    if (!container) return;
    setIsFullScreen(!isFullScreen);
    if (document.fullscreenElement) {
        document.exitFullscreen();
        setIsFullScreen(false);
        return;
    }
    setIsFullScreen(true);
    container.requestFullscreen();
};

const handleVideoKeyControls = ({videoRef, event, videoElm, handleScreenToggle, isFullScreen, setIsFullScreen} : VideoKeyControlProps) => {
    const key = event.key.toLowerCase();
    const v = videoRef?.current;
    if (!v) return;
    const {min, max} = Math;        const clamp = (numVal: number, minVal: number, maxVal: number) => min(max(numVal, minVal), maxVal);
    const actions: Record<string, () => void> = {
        ' ': () => {
            event.preventDefault();
            if (v.paused) {
                v.play();
                return;
            }
            v.pause();
        },
        arrowright: () => {
            v.currentTime = min(v.currentTime + 10, v.duration);
        },
        arrowleft: () => {
            v.currentTime = max(v.currentTime - 10, 0);
        },
        arrowup: () => {
            videoElm.volume = clamp(videoElm.volume + 0.1, 0, 1);
        },
        arrowdown: () => {
            videoElm.volume = clamp(videoElm.volume - 0.1, 0, 1);
        },
        m: () => {
            videoElm.muted = !videoElm.muted;
        },
        f: () => {
            handleScreenToggle({videoRef, isFullScreen, setIsFullScreen});
        },
        '>': () => {
            videoElm.playbackRate = clamp(videoElm.playbackRate + 0.1, 0.1, 5);
        },
        '.': () => {
            videoElm.playbackRate = clamp(videoElm.playbackRate + 0.1, 0.1, 5);
        },
        '<': () => {
            videoElm.playbackRate = clamp(videoElm.playbackRate - 0.1, 0.1, 5);
        },
        ',': () => {
            videoElm.playbackRate = clamp(videoElm.playbackRate - 0.1, 0.1, 5);
        },
    };
    const action = actions[key];
    if (action) action();
};

export {handleTimeUpdate, handleScreenToggle, handleVideoKeyControls};
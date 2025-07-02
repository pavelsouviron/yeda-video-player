'use client'

import React, {useRef, useState, useEffect} from 'react';
import Hls from 'hls.js';
import {VideoPlaylistProps} from '@/app/types/player-types';
import {PlayerContext} from '@/app/components/video-player/PlayerContext';
import PlayerController from '@/app/components/video-player/PlayerController';
import {handleScreenToggle, handleTimeUpdate, handleVideoKeyControls} from "@/app/utils/player-utils";

const YedaVideoPlayer: React.FC<VideoPlaylistProps> = ({hlsPlaylistUrl, videoLength, chapters}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [resOptions, setResOptions] = useState<{ label: string; index: number }[]>([]);
    const [isFullScreen, setIsFullScreen] = useState(false);

    /** Keyboard controls hook */
    useEffect(() => {
        if (!isFocused || !videoRef.current) return;

        const handler = (event: KeyboardEvent) => handleVideoKeyControls({videoRef, event, videoElm: videoRef.current!, handleScreenToggle, isFullScreen, setIsFullScreen});

        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [isFocused, videoRef]);

    /** HLS hook */
    useEffect(() => {
        const video = videoRef.current;
        if (!video || !Hls.isSupported()) return;

        const hls = new Hls();
        hls.loadSource(hlsPlaylistUrl);
        hls.attachMedia(video);

        const handleManifest = () => {
            setResOptions(hls.levels.map((l, i) => ({label: `${l.height}p`, index: i})));
        };

        hls.on(Hls.Events.MANIFEST_PARSED, handleManifest);
        hlsRef.current = hls;

        return () => {
            hls.off(Hls.Events.MANIFEST_PARSED, handleManifest);
            hls.destroy();
        };
    }, [hlsPlaylistUrl]);

    /** OnMount hook */
    useEffect(() => {
        videoRef.current?.parentElement?.focus();
    }, []);

    const contextValue = {videoRef, hlsRef, currentTime, setCurrentTime, videoLength, chapters, resOptions, screenSizeProps: {isFullScreen, setIsFullScreen}, handleScreenToggle};
    const containerProps = {
        className: `yeda-video-player relative w-full mx-auto ${!isFullScreen ? 'max-w-4xl' : 'full-screen'}`,
        tabIndex: 0,
        onFocus: () => setIsFocused(true),
        onBlur: () => setIsFocused(false)
    };
    const videoProps = {
        className: 'h-full w-full rounded-lg shadow',
        ref: videoRef,
        onTimeUpdate: () => handleTimeUpdate({videoRef, setCurrentTime}),
        onContextMenu: (e: React.MouseEvent<HTMLVideoElement, MouseEvent>) => e.preventDefault()
    };
    const controllerProps = {videoRef, hlsRef, chapters, currentTime, setCurrentTime, resOptions, videoLength, screenSizeProps: {isFullScreen, setIsFullScreen}, handleScreenToggle};

    return (
        <PlayerContext.Provider value={contextValue}>
            <div {...containerProps}>
                <video {...videoProps}/>
                <PlayerController {...controllerProps}/>
            </div>
        </PlayerContext.Provider>
    );
};

export default YedaVideoPlayer;

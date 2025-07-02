'use client'

import React, {useRef, useState, useEffect} from 'react';
import Hls from 'hls.js';
import {VideoPlaylistProps} from '@/app/types/player-types';
import {PlayerContext} from '@/app/components/video-player/PlayerContext';
import PlayerController from '@/app/components/video-player/PlayerController';

const YedaVideoPlayer: React.FC<VideoPlaylistProps> = ({hlsPlaylistUrl, videoLength, chapters}) => {
    const videoRef = useRef<HTMLVideoElement | null>(null);
    const hlsRef = useRef<Hls | null>(null);

    const [isFocused, setIsFocused] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [resOptions, setResOptions] = useState<{label: string; index: number}[]>([]);
    const [isFullScreen, setIsFullScreen] = useState(false);

    const contextValue = {videoRef, hlsRef, currentTime, setCurrentTime, videoLength, chapters, resOptions, screenSizeProps: {isFullScreen, setIsFullScreen}};

    const handleTimeUpdate = () => {
        if (!videoRef.current) return;
        setCurrentTime(videoRef.current.currentTime);
    };

    const handleVideoKeyControls = (e: KeyboardEvent, video: HTMLVideoElement) => {
        switch (e.key) {
            case ' ':
                e.preventDefault();
                if (video.paused) {
                    video.play();
                    break;
                }
                video.pause();
                break;
            case 'ArrowRight':
                video.currentTime = Math.min(video.currentTime + 10, video.duration);
                break;
            case 'ArrowLeft':
                video.currentTime = Math.max(video.currentTime - 10, 0);
                break;
            case 'm':
            case 'M':
                video.muted = !video.muted;
                break;
        }
    };

    /** Keyboard controls hook */
    useEffect(() => {
        if (!isFocused || !videoRef.current) return;

        const handler = (e: KeyboardEvent) => handleVideoKeyControls(e, videoRef.current!);

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

    return (
        <PlayerContext.Provider value={contextValue}>
            <div className={`yeda-video-player relative w-full mx-auto ${!isFullScreen ? 'max-w-4xl' : 'full-screen'}`}
                 tabIndex={0}
                 onFocus={() => setIsFocused(true)}
                 onBlur={() => setIsFocused(false)}>
                <video className="h-full w-full rounded-lg shadow"
                       ref={videoRef}
                       onTimeUpdate={handleTimeUpdate}
                       onContextMenu={(e) => e.preventDefault()}/>
                <PlayerController videoRef={videoRef}
                                  hlsRef={hlsRef}
                                  chapters={chapters}
                                  currentTime={currentTime}
                                  setCurrentTime={setCurrentTime}
                                  resOptions={resOptions}
                                  videoLength={videoLength}
                                  screenSizeProps={{isFullScreen, setIsFullScreen}}/>
            </div>
        </PlayerContext.Provider>
    );
};

export default YedaVideoPlayer;

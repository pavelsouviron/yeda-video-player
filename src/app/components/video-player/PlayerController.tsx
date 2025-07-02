import React, {useCallback, useEffect, useRef, useState} from 'react';
import {ChapterTooltipProps, PlayerControllerProps, ScrubberProps} from '@/app/types/player-types';

import {formatTime} from '@/app/utils/utils';
import {usePlayerContext} from '@/app/components/video-player/PlayerContext';
import PlayerPlayPause from '@/app/components/video-player/PlayerPlayPause';
import PlayerVolume from '@/app/components/video-player/PlayerVolume';
import PlayerSettings from '@/app/components/video-player/PlayerSettings';
import PlayerResolution from '@/app/components/video-player/PlayerResolution';
import PlayerToggleScreen from '@/app/components/video-player/PlayerToggleScreen';
import PlayerChapter from '@/app/components/video-player/PlayerChapter';

import YedaIcon from '@pub/icons/yeda.svg';
import PlayerChapterTooltip from '@/app/components/video-player/PlayerChapterTooltip';
import PlayerScrubber from '@/app/components/video-player/PlayerScrubber';

const logoLink = {href: 'https://yedalabs.io/', title: 'Go To Home Page', target: '_blank'};

const PlayerController: React.FC<PlayerControllerProps> = () => {
    const [hoverTime, setHoverTime] = useState<number | null>(null);
    const [hoverChapter, setHoverChapter] = useState<string | null>(null);
    const [isScrubGrab, setIsScrubGrab] = useState<boolean>(false);
    const boundRect = useRef<DOMRect | null>(null);
    const {videoRef, hlsRef, currentTime, videoLength, chapters, resOptions, screenSizeProps} = usePlayerContext();

    const seekTo = (time: number) => {
        if (!videoRef?.current) return;
        videoRef.current.currentTime = time;
    };

    const handleScrubMove = useCallback((e: MouseEvent) => {
        if (!boundRect || !boundRect?.current) return;
        const percent = Math.min(Math.max((e.clientX - boundRect.current.left) / boundRect.current.width, 0), 1);
        seekTo(percent * videoLength);
    }, [videoLength]);

    const startDraggingAt = (clientX: number) => {
        if (!boundRect.current) return;
        const percent = Math.min(Math.max((clientX - boundRect.current.left) / boundRect.current.width, 0), 1);
        seekTo(percent * videoLength);
        const moveHandler = (e: MouseEvent) => handleScrubMove(e);
        const upHandler = () => {
            window.removeEventListener('mousemove', moveHandler);
            window.removeEventListener('mouseup', upHandler);
            setIsScrubGrab(false);
        };
        window.addEventListener('mousemove', moveHandler);
        window.addEventListener('mouseup', upHandler);
    };

    const scrubberDownHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.ctrlKey) return;
        boundRect.current = e.currentTarget.getBoundingClientRect();
        startDraggingAt(e.clientX);
    };

    const scrubberMoveHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const percent = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1);
        const time = percent * videoLength;
        setHoverTime(time);
        setHoverChapter(getChapterForTime(time));
    };
    const scrubberLeaveHandler = () => {
        setHoverTime(null);
        setHoverChapter(null);
    };

    const scrubberGrabHandler = (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation();
        setIsScrubGrab(true);

        const timeline = document.querySelector('.scrub-h') as HTMLElement;
        if (!timeline) return;
        boundRect.current = timeline.getBoundingClientRect();
        startDraggingAt(e.clientX);
    };

    const getChapterForTime = useCallback((time: number): string | null => {
        const chapter = chapters.find((c) => time >= c.start && time <= c.end);
        return chapter ? chapter.title : null;
    }, [chapters]);

    useEffect(() => {
        if (!videoRef?.current) return;
        videoRef.current?.parentElement?.focus();
    }, []);

    const tooltipProps: ChapterTooltipProps = {hoverTime, videoLength, hoverChapter, formatTime};
    const scrubberProps: ScrubberProps = {isScrubGrab, currentTime, videoLength, scrubberGrabHandler};

    return (
        <div className={`player-controller absolute absolute-center-x m-auto bottom-0 h-14 w-full-pad flex flex-col gap-1`}>
            <div className="relative flex items-center gap-[4px] w-full scrub-h hand group"
                 onMouseDown={scrubberDownHandler}
                 onMouseMove={scrubberMoveHandler}
                 onMouseLeave={scrubberLeaveHandler}>
                {chapters.map((chapter, index) => {
                    return (<PlayerChapter key={index} {...{chapter, videoLength, currentTime, index, seekTo}}></PlayerChapter>);
                })}
            </div>
            <PlayerScrubber {...scrubberProps}></PlayerScrubber>
            {hoverTime !== null && (<PlayerChapterTooltip {...tooltipProps}/>)}
            <div className="relative flex justify-between items-center w-full h-6 text-white rounded-b-lg text-sm">
                <div className="flex items-center gap-4">
                    <PlayerPlayPause/>
                    <PlayerVolume/>
                    <span>{formatTime(currentTime)} / {formatTime(videoLength)}</span>
                </div>
                <div className="flex items-center gap-4 relative">
                    <div className="group relative flex items-center justify-center">
                        <PlayerSettings/>
                        <PlayerResolution ref={hlsRef} opt={resOptions}/>
                    </div>
                    <PlayerToggleScreen setIsFullScreen={screenSizeProps.setIsFullScreen} isFullScreen={screenSizeProps.isFullScreen}/>
                    <span className="text-white font-bold text-sm"><a {...logoLink}><img alt="Logo" src={YedaIcon.src}/></a></span>
                </div>
            </div>
        </div>
    );
};
export default PlayerController;

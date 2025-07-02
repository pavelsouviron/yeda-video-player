import React from 'react';
import Hls from 'hls.js';

export type ResolutionOption = {
    label: string;
    index: number;
};

export type ResolutionOptions = {
    opt: ResolutionOption[];
    ref: React.RefObject<Hls | null>;
};

export type ScreenSizeProps = {
    setIsFullScreen: React.Dispatch<React.SetStateAction<boolean>>;
    isFullScreen: boolean;
};

interface VideoChapterProps {
    title: string;
    start: number;
    end: number;
}

export interface VideoPlaylistProps {
    hlsPlaylistUrl: string;
    videoLength: number;
    chapters: VideoChapterProps[];
}

export interface PlayerControllerProps {
    videoRef: React.RefObject<HTMLVideoElement | null>;
    hlsRef: React.RefObject<Hls | null>;
    currentTime: number;
    setCurrentTime: (time: number) => void;
    videoLength: number;
    chapters: ChapterProps[];
    resOptions: {label: string; index: number}[];
    screenSizeProps: ScreenSizeProps;
}

export interface ChapterProps {
    title: string;
    start: number;
    end: number;
}

export interface TimelineChapterProps {
    chapter: ChapterProps;
    videoLength: number;
    currentTime: number;
    index: number;
    seekTo: (time: number) => void;
}

export interface ChapterTooltipProps {
    hoverTime: number | null;
    videoLength: number;
    hoverChapter: string | null;
    formatTime: (time: number) => string;
}

export interface ScrubberProps {
    isScrubGrab: boolean;
    currentTime: number;
    videoLength: number;
    scrubberGrabHandler: (e: React.MouseEvent<HTMLDivElement>) => void;
}

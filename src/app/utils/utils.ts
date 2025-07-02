import {FullscreenDocument, FullscreenElement} from '@/app/types/util-types';

export const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
}

export const enterFullscreen = (element: HTMLElement) => {
    const el = element as FullscreenElement;
    (el.requestFullscreen ?? el.webkitRequestFullscreen ?? el.mozRequestFullScreen ?? el.msRequestFullscreen)?.();
};

export const exitFullscreen = () => {
    const doc = document as FullscreenDocument;
    (doc.exitFullscreen ?? doc.webkitExitFullscreen ?? doc.mozCancelFullScreen ?? doc.msExitFullscreen)?.();
};

export const isFullscreen = (): boolean => {
    const doc = document as FullscreenDocument;
    return Boolean(
        doc.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
    );
};

export const toggleFullscreen = (element: HTMLElement) => {
    if (isFullscreen()) {
        exitFullscreen();
        return;
    }
    enterFullscreen(element);
};

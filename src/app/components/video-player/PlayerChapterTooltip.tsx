import {ChapterTooltipProps} from '@/app/types/player-types';
import TooltipTriangle from '@pub/icons/tooltip-triangle.svg';

const PlayerChapterTooltip = (ctp: ChapterTooltipProps) => {
    if (!ctp?.hoverTime) return null;
    return (
        <div className="absolute flex flex-col flex-items-center gap-1 z-10 bottom-full mb-2 p-2 text-xs text-white bg-semidark-grey rounded pointer-events-none whitespace-nowrap trans-x-50"
             style={{left: `${(ctp.hoverTime / ctp.videoLength) * 100}%`}}>
            <span>{ctp.hoverChapter ? ctp.hoverChapter : ''}</span><span>{ctp.formatTime(ctp.hoverTime)}</span>
            <img className="absolute absolute-center-x tooltip-triangle m-auto" alt="Tooltip Triangle" src={TooltipTriangle.src}/>
        </div>
    );
};

export default PlayerChapterTooltip;

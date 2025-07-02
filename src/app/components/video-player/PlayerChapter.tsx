import {TimelineChapterProps} from '@/app/types/player-types';

const PlayerChapter = (props: TimelineChapterProps) => {
    const chapterDuration = props.chapter.end - props.chapter.start;
    const chapterPercent = chapterDuration / props.videoLength;
    const chapterProgress = Math.min(Math.max((props.currentTime - props.chapter.start) / chapterDuration, 0), 1) * 100;
    return (
        <div key={props.index}
             title={props.chapter.title}
             onClick={(e) => {
                 e.stopPropagation();
                 if (e.ctrlKey) props.seekTo(props.chapter.start);
             }}
             className={`relative h-full overflow-hidden flex flex-items-center align-middle flex-1`}
             style={{flexBasis: `${chapterPercent * 100}%`}}>
            <div className="absolute left-0 rounded h-1 w-full bg-dark-grey"/>
            <div className="absolute left-0 rounded h-1 bg-white" style={{width: `${chapterProgress}%`}}/>
        </div>
    );
};

export default PlayerChapter;

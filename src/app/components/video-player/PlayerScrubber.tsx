import {ScrubberProps} from '@/app/types/player-types';

const PlayerScrubber = (props: ScrubberProps) => {
    return (
        <div id="scrubber"
             className={`absolute ${props.isScrubGrab ? 'grabbing' : 'grab'} w-[6px] h-[18px] bg-white shadow rounded`}
             style={{left: `calc(${(props.currentTime / props.videoLength) * 100}% - 2px)`}}
             onMouseDown={props.scrubberGrabHandler}
        />
    );
};

export default PlayerScrubber;

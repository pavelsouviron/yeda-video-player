import React from 'react';
import {ResolutionOptions} from '@/app/types/player-types';

const PlayerResolution = ({opt, ref}: ResolutionOptions) => {
    const v = ref?.current;
    if (!v) return null;
    return (
        <div className="absolute right-0 bottom-4 w-32 p-2 bg-white text-black rounded shadow-lg hidden z-10 group-hover:block">
            {opt.map(res => (
                <button key={res.index}
                        onClick={() => v.currentLevel = res.index}
                        className="block hand w-full text-left px-2 py-1 text-sm hover:bg-gray-200">
                    {res.label}
                </button>
            ))}
        </div>
    );
};

export default PlayerResolution;

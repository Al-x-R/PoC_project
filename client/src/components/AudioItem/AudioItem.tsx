import React, {FC, useEffect, useState} from 'react';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import MoveableItem from "../MoveableItem/MoveableItem";

const iconStyles = {
    fontSize: 40,
}

export interface AudioProps {
    url: string,
    idx: number
}

const AudioItem: FC<AudioProps> = ({url, idx}) => {
    const [audio] = useState(new Audio(url));
    const [target, setTarget] = useState<HTMLAudioElement | null>(null);
    const [playing, setPlaying] = useState(false);
    const [isSelected, setIsSelected] = useState(false)

    const toggle = () => {
        if (isSelected) {
            setPlaying(!playing)
        }
    };

    useEffect(() => {
        const target = document.querySelector<HTMLAudioElement>(`.targetAudio${idx}`);
        setTarget(target);
    }, [idx]);

    useEffect(() => {
            playing ? audio.play() : audio.pause();
        },
        [playing]
    );

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    const audioItem = (
        <div className={`targetAudio${idx}`}>
            {playing
                ? <PauseCircleOutlineIcon style={iconStyles}
                    // className={`targetAudio${idx}`}
                                          onClick={toggle}
                />
                : <VolumeUpIcon style={iconStyles}
                    // className={`targetAudio${idx}`}
                                onClick={toggle}
                />
            }
        </div>
    )
    
    return (
        <MoveableItem target={target} children={audioItem} isSelectedAudio={setIsSelected}/>
    );
};

export default AudioItem;
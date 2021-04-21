import React, {FC, useEffect, useState} from 'react';
import Moveable from 'react-moveable';
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

    const toggle = () => {
        // if (isSelected) {
            setPlaying(!playing)
        // }
    };

    useEffect(() => {
        const target = document.querySelector<HTMLAudioElement>(`.targetAudio`);
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
            <div onClick={toggle} className="targetAudio">
                {playing ? <PauseCircleOutlineIcon style={iconStyles} className="targetAudio"/> :
                    <VolumeUpIcon style={iconStyles} className="targetAudio"/>}
            </div>
    )


    return (
        <MoveableItem target={target} children={audioItem} />
    );
};

export default AudioItem;
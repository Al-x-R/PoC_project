import React, {useEffect, useState} from 'react';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';

const iconStyles = {
    fontSize: 40,
}

// @ts-ignore
const AudioItem = ({url}) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);

    const toggle = () => setPlaying(!playing);

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


    return (
        <div onClick={toggle}>
            {playing ? <PauseCircleOutlineIcon style={iconStyles}/> : <VolumeUpIcon style={iconStyles}/>}
        </div>
    );
};

export default AudioItem;
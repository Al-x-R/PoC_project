import React, {FC, useEffect, useState} from 'react';
import Moveable from 'react-moveable';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import PauseCircleOutlineIcon from '@material-ui/icons/PauseCircleOutline';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

const iconStyles = {
    fontSize: 40,
}

export interface AudioProps {
    url: string
}

const AudioItem: FC<AudioProps> = ({url}) => {
    const [audio] = useState(new Audio(url));
    const [target, setTarget] = useState<HTMLAudioElement | null>(null);
    const [isSelectedAudio, setIsSelectedAudio] = useState(false)
    const [playing, setPlaying] = useState(false);
    const [frame] = useState({
        translate: [0, 0],
        rotate: 0
    });

    const toggle = () => {
        if (isSelectedAudio) {
            setPlaying(!playing)
        }
    };

    useEffect(() => {
        const target = document.querySelector<HTMLAudioElement>(".targetAudio");
        setTarget(target);
    }, [audio]);

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
        <div onClick={() => setIsSelectedAudio(true)}>
            <ClickAwayListener onClickAway={() => setIsSelectedAudio(false)}>
                <div onClick={toggle} className="targetAudio">
                    {playing ? <PauseCircleOutlineIcon style={iconStyles} className="targetAudio"/> :
                        <VolumeUpIcon style={iconStyles} className="targetAudio"/>}
                </div>
            </ClickAwayListener>
            {isSelectedAudio &&
            <Moveable
              target={target}
              draggable={true}
              throttleDrag={0}
              resizable={true}
              throttleResize={0}
              rotatable={true}
              rotationPosition={"top"}
              throttleRotate={0}
              onDragStart={({set}) => {
                  set(frame.translate);
              }}
              onDrag={({beforeTranslate}) => {
                  frame.translate = beforeTranslate;
              }}
              onResizeStart={({setOrigin, dragStart}) => {
                  setOrigin(["%", "%"]);
                  dragStart && dragStart.set(frame.translate);
              }}
              onResize={({target, width, height, drag}) => {
                  frame.translate = drag.beforeTranslate;
                  target.style.width = `${width}px`;
                  target.style.height = `${height}px`;
              }}
              onRotateStart={({set}) => {
                  set(frame.rotate);
              }}
              onRotate={({beforeRotate}) => {
                  frame.rotate = beforeRotate;
              }}
              onRender={({target}) => {
                  target.style.transform = `translate(${frame.translate[0]}px, ${
                      frame.translate[1]
                  }px) rotate(${frame.rotate}deg)`;
              }}
            />
            }
        </div>

    );
};

export default AudioItem;
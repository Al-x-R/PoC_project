import React, {FC, useState} from 'react';
import Moveable from "react-moveable";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import CurrentBookStore from '../../stores/сurrentBookStore'

interface Props {
    children: JSX.Element | null,
    target: any,
    isSelectedAudio?: (value: boolean) => void,
    id: number
}

const MoveableItem: FC<Props> = ({children, target, isSelectedAudio, id}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [frame] = useState({
        translate: [0, 0],
        rotate: 0
    });

    console.log('target ', target.style.transform)

    const sendData = (value: boolean) => {
        if (isSelectedAudio) {
            isSelectedAudio(value)
        }
    }

    return (
        <div onClick={(e) => {
            setIsSelected(true)
            sendData(true)
        }}>
            <ClickAwayListener onClickAway={() => {
                setIsSelected(false)
                sendData(false)
            }}>
                {children}
            </ClickAwayListener>
            {isSelected &&
            <Moveable
              target={target}
              draggable={true}
              throttleDrag={0}
              resizable={true}
              throttleResize={0}
              rotatable={true}
              rotationPosition={"top"}
              throttleRotate={0}
              onDragStart={(e) => console.log(e)
              //     ({set}) => {
              //     set(frame.translate);
              //     console.log(set)
              // }
              }
              onDrag={({beforeTranslate}) => {
                  // frame.translate = beforeTranslate;
                  CurrentBookStore.currentElementUpdateTranslate(id, beforeTranslate)
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
                  // frame.rotate = beforeRotate;
                  console.log(typeof beforeRotate)
                  CurrentBookStore.currentElementUpdateRotate(id, beforeRotate)
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
}

export default MoveableItem
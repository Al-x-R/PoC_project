import React, {FC, useState} from 'react';
import Moveable from "react-moveable";
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

interface Props {
    children: any,
    target: any
}

const MoveableItem: FC<Props> = ({children, target}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [frame] = useState({
        translate: [0, 0],
        rotate: 0
    });

    return (
        <div onClick={(e) => {
            setIsSelected(true)
        }}>
            <ClickAwayListener onClickAway={() => setIsSelected(false)}>
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
}

export default MoveableItem
import React, {FC, useEffect, useState} from 'react';
import Moveable from "react-moveable";

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import DOMPurify from 'dompurify';

export type TextProps = {
    idx: number
    text?: string;
}

// @ts-ignore
const TextComponent: FC<TextProps> = ({idx, text}) => {
    const [isSelected, setIsSelected] = useState(false)
    const [target, setTarget] = useState('');
    const [frame] = useState({
        translate: [0, 0],
        rotate: 0
    });

    const createMarkup = (html: string | undefined) => {
        return {
            // @ts-ignore
            __html: DOMPurify.sanitize(html)
        }
    }

    useEffect(() => {
        const target = document.querySelectorAll<HTMLElement>(`.targetText${idx}`);
        // @ts-ignore
        setTarget(target);
    }, []);

    return (
        <div onClick={(e) => {
            setIsSelected(true)
        }}>
            <ClickAwayListener onClickAway={() => setIsSelected(false)}>
                <div
                    className={`targetText${idx}`}
                    dangerouslySetInnerHTML={createMarkup(text)}>
                </div>
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
};

export default TextComponent;
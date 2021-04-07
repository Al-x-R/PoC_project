import React, {useEffect, useRef, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import Moveable from "react-moveable";

const TextComponent = () => {
    const [isSelected, setIsSelected] = useState(false)
    const [target, setTarget] = useState('');
    const [frame] = useState({
        translate: [0, 0],
        rotate: 0
    });

    const moveableRef = useRef(null);

    useEffect(() => {
        const target = document.querySelector<HTMLImageElement>(".targetText");
        // @ts-ignore
        setTarget(target);

        // @ts-ignore
        target.addEventListener("load", () => {
            setTimeout(() => {
                // @ts-ignore
                moveableRef.current.updateRect();
            }, 2000);
        });
    }, []);

    return (
        <div onClick={() => setIsSelected(!isSelected)}>
            <Typography variant="body1" gutterBottom className="targetText">
                body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur
                unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam
                dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam
            </Typography>
            {isSelected &&
            <Moveable
              ref={moveableRef}
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
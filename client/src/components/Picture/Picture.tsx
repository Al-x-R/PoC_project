import React, {useState, useEffect, useRef} from 'react';
import Moveable from "react-moveable";

const pictureStyles = {
    width: '300px',
    height: '200px',
    objectFit: 'cover'
} as React.CSSProperties

const Picture = () => {
    const [target, setTarget] = useState('');
    const [frame] = useState({
        translate: [0, 0],
        rotate: 0
    });
    console.log(target)
    const moveableRef = useRef(null);

    useEffect(() => {
        const target = document.querySelector<HTMLImageElement>(".target");
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
        <div style={pictureStyles}>
            <img className="target" style={pictureStyles}
                 src='https://res.cloudinary.com/css-tricks/image/fetch/w_1200,q_auto,f_auto/https://css-tricks.com/wp-content/uploads/2020/09/react-suspense.png'
                 alt='picture'/>
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
        </div>
    );
};

export default Picture;
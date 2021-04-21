import React, {useState, useEffect, FC} from 'react';
import {observer} from 'mobx-react-lite';
import MoveableItem from "../MoveableItem/MoveableItem";

const pictureStyles = {
    width: '300px',
    height: '200px',
    objectFit: 'cover'
} as React.CSSProperties

export interface PictureProps {
    src: string
    id: number
}

const Picture: FC<PictureProps> = observer(({id, src}) => {
    const [target, setTarget] = useState<HTMLImageElement | null>(null);

    useEffect(() => {
        const target = document.querySelector<HTMLImageElement>(".target");
        setTarget(target);
    }, []);

    const pictureItem = (
        <img className="target" style={pictureStyles}
             src={src}
             alt=''/>
    )

    return (
        <MoveableItem target={target} children={pictureItem} />
    );
});

export default Picture;
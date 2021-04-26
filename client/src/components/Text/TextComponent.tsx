import React, {FC, useEffect, useState} from 'react';
import DOMPurify from 'dompurify';
import MoveableItem from "../MoveableItem/MoveableItem";

export type TextProps = {
    idx: number
    text?: string;
    id: number
}

const TextComponent: FC<TextProps> = ({idx, text, id}) => {
    const [target, setTarget] = useState<NodeListOf<HTMLElement> | null>(null);

    const createMarkup = (html: string | undefined) => {
        return {
            // @ts-ignore
            __html: DOMPurify.sanitize(html)
        }
    }

    useEffect(() => {
        const target = document.querySelectorAll<HTMLElement>(`.targetText${idx}`);
        setTarget(target);
    }, [idx]);

    const textItem = (
        <div
            className={`targetText${idx}`}
            dangerouslySetInnerHTML={createMarkup(text)}>
        </div>
    )

    return (
        <MoveableItem target={target} children={textItem} id={id} />
    );
};

export default TextComponent;
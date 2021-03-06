import React, {FC, useEffect, useState} from 'react';
import Paper from '@material-ui/core/Paper';
import Picture from '../Picture/Picture';
import TextComponent from '../Text/TextComponent';

import {observer} from 'mobx-react-lite';
import AudioItem from "../AudioItem/AudioItem";
import {PageItem} from '../../stores/сurrentBookStore';
import CurrentBookStore from '../../stores/сurrentBookStore';
import {useLocation} from "react-router-dom";

export interface PropTypes {
    page?: PageItem;
    pageStyles: string
}

const Page: FC<PropTypes> = observer(({page, pageStyles}) => {
    const pictures = page?.elements?.filter(el => el.type === 'picture')
    const texts = page?.elements?.filter(el => el.type === 'text')
    const audios = page?.elements?.filter(el => el.type === 'audio')

    const location = useLocation();
    const [isReadBook, setIsReadBook] = useState(false)

    useEffect(() => {
        return setIsReadBook(location.pathname === '/');
    }, [location.pathname]);

    return (
        <div>

            {!isReadBook && <div>Current page id is {page?.pageNumber} of {CurrentBookStore.countPages}</div>}
                    <Paper className={pageStyles}>
                        {pictures && pictures.map(pic => (
                            // @ts-ignore
                            <Picture key={pic.id} id={pic.id} src={pic.url} id={pic.id}/>
                        ))}
                        {texts && texts.map((t, index) => {
                            return <TextComponent key={t.id} text={t.text} idx={index} id={t.id}/>
                        })}
                        {audios && audios.map((item, index) => {
                            // @ts-ignore
                            return <AudioItem key={item.id} url={item.mediaBlobUrl} idx={index} id={item.id}/>
                        })}
                    </Paper>

        </div>
    );
});

export default Page;

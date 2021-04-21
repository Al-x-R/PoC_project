import React, {FC} from 'react';
import Paper from '@material-ui/core/Paper';
import Picture from '../Picture/Picture';
import TextComponent from '../Text/TextComponent';

import {observer} from 'mobx-react-lite';
import AudioItem from "../AudioItem/AudioItem";
import {PageItem} from '../../stores/сurrentBookStore';
import CurrentBookStore from '../../stores/сurrentBookStore';

const paperStyle = {
    width: '500px',
    height: '500px',
    border: 'solid',
    // overflow: 'hidden'
}

export interface PropTypes {
    page?: PageItem
}

const Page: FC<PropTypes> = observer(({page}) => {
    const pictures = page?.elements?.filter(el => el.type === 'picture')
    const texts = page?.elements?.filter(el => el.type === 'text')
    const audios = page?.elements?.filter(el => el.type === 'audio')

    return (
        <div>

            {/*{!isReadBook && <div>Current page id is {page?.pageNumber} of {CurrentBookStore.countPages}</div>}*/}
            <div>Current page id is {page?.pageNumber} of {CurrentBookStore.countPages}</div>
                    <Paper style={paperStyle}>
                        {pictures && pictures.map(pic => (
                            // @ts-ignore
                            <Picture key={pic.id} id={pic.id} src={pic.url}/>
                        ))}
                        {texts && texts.map((t, index) => {
                            return <TextComponent key={t.id} text={t.text} idx={index}/>
                        })}
                        {audios && audios.map((item, index) => {
                            // @ts-ignore
                            return <AudioItem key={item.id} url={item.mediaBlobUrl} idx={index}/>
                        })}
                    </Paper>

        </div>
    );
});

export default Page;

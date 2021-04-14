import React, {FC} from 'react';
import Paper from '@material-ui/core/Paper';
import Picture from '../Picture/Picture';
import TextComponent from '../Text/TextComponent';

import {observer} from 'mobx-react-lite';
import {TextItem, TextStore} from '../../stores/text';
import {AudioStore} from "../../stores/audio";
import AudioItem from "../AudioItem/AudioItem";
import {PageItemImpl} from "../../stores/page";

const paperStyle = {
    width: '500px',
    height: '500px',
    border: 'solid',
    // overflow: 'hidden'
}

export interface PropTypes {
    pageId?: number,
    pageNumber?: number,
    img?: object,
    textItem?: TextItem
}

const Page: FC<PropTypes> = observer(() => {

    return (
        <div>
            <Paper style={paperStyle}>
                <Picture/>
                {TextStore.texts.map((t, index) => {
                    return <TextComponent key={t.id} textItem={t} idx={index}/>
                })}
                {AudioStore.audios.map((item) => {
                    return <AudioItem key={item.id} url={item.mediaBlobUrl} />
                })}
            </Paper>
        </div>
    );
});

export default Page;
import React, {useEffect, FC} from 'react';
import AudioRecorder from '../components/AudioRecorder/AudioRecorder';
import TopBar from '../components/TopBar/TopBar';
import Carousel from '../components/Carousel/Carousel';

import {observer} from 'mobx-react-lite';
import {MenuStore} from '../stores/menu';
import CurrentBookStore from '../stores/сurrentBookStore';

const pageStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '150px'
}

export type PropTypes = {
    pageId: number,
    pageNumber: number,
    img: object
}

const EditBookPage: FC<PropTypes> = observer(() => {

    useEffect(() => {
        PageStore.getPages()
    }, [])

    return (
        <>
            {MenuStore.isAudio ? <AudioRecorder/> : <TopBar/>}
            <div style={pageStyle}>
                <Carousel/>
            </div>
        </>
    );
})

export default EditBookPage;
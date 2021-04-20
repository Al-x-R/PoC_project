import React, {useEffect} from 'react';
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

const EditBookPage = observer(() => {

    useEffect(() => {
        CurrentBookStore.initializePages();
    }, []);

    return (
        <>
            {MenuStore.isAudio ? <AudioRecorder/> : <TopBar/>}
            <div style={pageStyle}>
                {
                    CurrentBookStore.isLoading
                        ? <div>Loading...</div>
                        : <Carousel/>
                }
            </div>
        </>
    );
})

export default EditBookPage;
import React from 'react';
import Page from '../components/Page/Page';
import {TextStore} from "../stores/text";
import AudioRecorder from "../components/AudioRecorder/AudioRecorder";
import TopBar from "../components/TopBar/TopBar";
import {observer} from "mobx-react-lite";
import {MenuStore} from "../stores/menu";

const pageStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '150px'
}

const EditBookPage = observer(() => {

    return (
        <>
            { MenuStore.isAudio ? <AudioRecorder /> : <TopBar />}
            <div style={pageStyle}>
                <Page textStore={TextStore}/>
            </div>
        </>
    );
})

export default EditBookPage;
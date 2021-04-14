import React, {useState, useEffect, FC} from 'react';
import AudioRecorder from '../components/AudioRecorder/AudioRecorder';
import TopBar from '../components/TopBar/TopBar';
import Carousel from '../components/Carousel/Carousel';
import axios from 'axios'

import {observer} from 'mobx-react-lite';
import {MenuStore} from '../stores/menu';
import {PageStore} from '../stores/page';

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

const EditBookPage: FC<PropTypes> = observer(({pageNumber, pageId, img}) => {
    const [pages, setPages] = useState<any[]>([])

    useEffect(() => {
        axios.get('pages.json').then(res => {
            console.log('res ',res.data)
            setPages(res.data.pages)
            pages.map(p => PageStore.addPage(p.id, p.bookId, p.pageNumber, p.img))
        })
    },[])

    // useEffect(() => {
    //         pages.map(p => PageStore.addPage(p.id, p.bookId, p.pageNumber, p.img))
    // }, [])

    console.log('pages store ', PageStore.pages)

    return (
        <>
            { MenuStore.isAudio ? <AudioRecorder pageNumber={pageNumber} pageId={pageId}  /> : <TopBar />}
            <div style={pageStyle}>
                <Carousel />
            </div>
        </>
    );
})

export default EditBookPage;
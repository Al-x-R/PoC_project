import React, {useEffect, useState} from 'react';
import Page from '../Page/Page';
import {makeStyles} from '@material-ui/core';
import CurrentBookStore, {PageItem} from '../../stores/сurrentBookStore'
import {useLocation} from "react-router-dom";

const useStyles = makeStyles({

    book: {
        display: 'flex'
    }
})

export interface PropTypes {
    page?: PageItem
}

const Book = () => {
    const classes = useStyles()

    const nextPage = CurrentBookStore.nextPage
    const nextPagePictures = nextPage?.elements?.filter(el => el.type === 'picture')
    const nextPageTexts = nextPage?.elements?.filter(el => el.type === 'text')
    const nextPageAudios = nextPage?.elements?.filter(el => el.type === 'audio')

    const location = useLocation();
    const [isReadBook, setIsReadBook] = useState(false)
    const firstPage = CurrentBookStore.firstPage
    const lastPage = CurrentBookStore.lastPage

    useEffect(() => {
        return setIsReadBook(location.pathname === '/');
    }, [location.pathname]);

    return (
        <div className={classes.book}>
            {/*{isLast ? <div><Page/></div> :*/}
            {/*    <div className={classes.book}>*/}
            {/*        <Page/>*/}
            {/*        <Page/>*/}
            {/*    </div>*/}
            {/*}*/}
        </div>


    );
}

export default Book;
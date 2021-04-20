import React, {useEffect, useState} from 'react';
import {useLocation} from 'react-router-dom';
import {Button} from '@material-ui/core';
import {makeStyles} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Page from '../Page/Page';
import {observer} from 'mobx-react-lite';
import CurrentBookStore from '../../stores/сurrentBookStore'

const useStyles = makeStyles({
    mainBlock: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        fontSize: 45
    },
    book: {
        display: 'flex'
    }
})

const Carousel = observer(() => {
        const classes = useStyles();
        const [isReadBook, setIsReadBook] = useState(false)
        const first = CurrentBookStore.firstPage
        const last = CurrentBookStore.lastPage

        const location = useLocation();

        useEffect(() => {
            return setIsReadBook(location.pathname === '/');
        }, [location.pathname]);

        return (
            <div className={classes.mainBlock}>
                <Button onClick={CurrentBookStore.decreasePage}><ArrowBackIosIcon className={classes.icon}/></Button>
                {isReadBook
                    ? <div className={classes.book}>
                        <Page page={CurrentBookStore.currentPage}/>
                        <Page page={CurrentBookStore.nextPage}/>
                    </div>
                    : <Page page={CurrentBookStore.currentPage}/>
                }
                <Button onClick={CurrentBookStore.increasePage}><ArrowForwardIosIcon className={classes.icon}/></Button>
            </div>
        );
    }
)

export default Carousel;
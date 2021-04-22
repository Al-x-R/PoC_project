import React from 'react';
import Page from '../Page/Page';
import {Button, makeStyles} from '@material-ui/core';
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import CurrentBookStore from '../../stores/сurrentBookStore'
import {observer} from "mobx-react-lite";

const useStyles = makeStyles({
    bookWrapper: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
    },
    book: {
        width: 1000,
        height: 500,
        position: 'relative',
        perspective: '2700px'
    },
    page: {
        position: 'absolute',
        border: '1px solid black',
        top: 0,
        left: '50%',
        width: '500px',
        height: '500px',
        backfaceVisibility: 'hidden',
        transform: 'rotateY(0deg)',

        '&:hover': {
            transform: 'rotateY(180deg)',
            transition: 'transform .6s,opacity .6s,z-index .01s .15s,-webkit-transform .6s',
            transformStyle: 'preserve-3d',
            transformOrigin: 'left center'
        },
    },
    icon: {
        fontSize: 45,

    },
})

const Book = observer(() => {
    const classes = useStyles()

    return (
        <div className={classes.bookWrapper}>
            <Button onClick={CurrentBookStore.decreasePage}><ArrowBackIosIcon className={classes.icon}/></Button>
            <div className={classes.book}>
                <Page page={CurrentBookStore.currentPage} pageStyles={classes.page}/>
            </div>
            <Button onClick={CurrentBookStore.increasePage}><ArrowForwardIosIcon className={classes.icon}/></Button>
        </div>

    );
})

export default Book;
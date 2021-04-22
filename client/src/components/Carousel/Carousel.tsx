import React from 'react';
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
    },
    paperStyle: {
        width: '500px',
        height: '500px',
        border: 'solid',
        // overflow: 'hidden'
    }
})

const Carousel = observer(() => {
        const classes = useStyles();

        return (
            <div className={classes.mainBlock}>
                <Button onClick={CurrentBookStore.decreasePage}><ArrowBackIosIcon className={classes.icon}/></Button>
                <Page page={CurrentBookStore.currentPage} pageStyles={classes.paperStyle}/>
                <Button onClick={CurrentBookStore.increasePage}><ArrowForwardIosIcon className={classes.icon}/></Button>
            </div>
        );
    }
)

export default Carousel;
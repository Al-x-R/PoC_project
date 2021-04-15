import React, {useState, useEffect, FC} from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Page from '../Page/Page';
import {observer} from 'mobx-react-lite';
import {PageStore} from '../../stores/page';


const useStyles = makeStyles({
    mainBlock: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        fontSize: 45
    }
})

export interface PropTypes {
    pageId: number,
    pageNumber: number,
    img: object,
}

const Carousel = observer(({}) => {
    const classes = useStyles();
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    const [page, setPage] = useState()

    console.log(page)

    useEffect(() => {
        // @ts-ignore
        return setPage(PageStore.getPage(currentPageNumber));

    }, [currentPageNumber])

    const nextPage = () => {
        if (currentPageNumber < 10) {
            setCurrentPageNumber(prevState => prevState + 1)
        }
    }

    const prevPage = () => {
        if (currentPageNumber > 1) {
            setCurrentPageNumber(prevState => prevState - 1)
        }
    }

    return (
        <div className={classes.mainBlock}>
            <Button onClick={prevPage}><ArrowBackIosIcon className={classes.icon}/></Button>
            <Page />

            <Button onClick={nextPage}><ArrowForwardIosIcon className={classes.icon}/></Button>
        </div>
    );
})

export default Carousel;
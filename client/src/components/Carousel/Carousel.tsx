import React, {useState, useEffect, FC} from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from "@material-ui/core";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import Page from '../Page/Page';
import {observer} from 'mobx-react-lite';
import {PageItem, PageItemImpl, PageStore} from '../../stores/page';


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

const Carousel = observer(({  }) => {
    const classes = useStyles();
    const [currentPageNumber, setCurrentPageNumber] = useState(1)
    console.log('page number ', currentPageNumber)



    useEffect(() => {
        console.log('get page ', PageStore.getPage(currentPageNumber))
        console.log('filter ',PageStore.pages.filter(p => p.pageNumber === currentPageNumber))
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
            {PageStore.pages.filter(p => {
                if(p.pageNumber === currentPageNumber) {
                  return  <Page pageId={p.id} img={p.img}/>
                }
            })}

            <Button onClick={nextPage}><ArrowForwardIosIcon className={classes.icon}/></Button>
        </div>
    );
})

export default Carousel;
import React, {useEffect} from 'react';
import TopBar from "../components/TopBar/TopBar";
import {makeStyles} from '@material-ui/core/styles';
import Carousel from "../components/Carousel/Carousel";
import CurrentBookStore from "../stores/сurrentBookStore";

const useStyles = makeStyles({
    book: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '150px'
    },
});


const ReadBookPage = () => {
    const classes = useStyles();

    useEffect(() => {
        CurrentBookStore.initializePages();
    }, []);

    return (
        <div>
         <TopBar />
         <div className={classes.book}>
             {
                 CurrentBookStore.isLoading
                     ? <div>Loading...</div>
                     : <Carousel/>
             }
         </div>
        </div>
    );
};

export default ReadBookPage;
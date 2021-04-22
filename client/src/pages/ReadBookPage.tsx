import React, {useEffect} from 'react';
import TopBar from "../components/TopBar/TopBar";
import {makeStyles} from '@material-ui/core/styles';
import CurrentBookStore from "../stores/сurrentBookStore";
import Book from "../components/Book/Book";
import {observer} from "mobx-react-lite";

const useStyles = makeStyles({
    bookWrapper: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '150px'
    },
});


const ReadBookPage = observer(() => {
    const classes = useStyles();

    useEffect(() => {
        CurrentBookStore.initializePages();
    }, []);

    return (
        <div>
         <TopBar />
         <div className={classes.bookWrapper}>
             {
                 CurrentBookStore.isLoading
                     ? <div>Loading...</div>
                     : <Book/>
             }
         </div>
        </div>
    );
});

export default ReadBookPage;
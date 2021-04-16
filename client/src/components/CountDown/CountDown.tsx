import React, {useEffect, useState, useRef} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MicIcon from '@material-ui/icons/Mic';
import {MenuStore} from '../../stores/menu';

const useStyles = makeStyles({
    counter: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        fontSize: 50,
        color: 'white'
    }
});

const CountDown = () => {
    const classes = useStyles();

    const [current, setCurrent] = useState(4)
    const [isOne, setIsOne] = useState(false)
    const [isTwo, setIsTwo] = useState(false)
    const [isThree, setIsThree] = useState(false)

    const refElem1 = useRef<HTMLDivElement>(null)
    const refElem2 = useRef<HTMLDivElement>(null)
    const refElem3 = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const interval = setInterval(() => {
            if (current > 0) {
                setCurrent(current => current - 1);
            }
            if (current === 1) {
                MenuStore.switchIsStartRecording(true)
                MenuStore.switchIsCountDown(false)
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [current]);

    useEffect(() => {
        const one = refElem1?.current?.innerText
        if (current === Number(one)) {
            setIsOne(true)
        } else {
            setIsOne(false)
        }
        const two = refElem2?.current?.innerText
        if (current === Number(two)) {
            setIsTwo(true)
        } else {
            setIsTwo(false)
        }
        const three = refElem3?.current?.innerText
        if (current === Number(three)) {
            setIsThree(true)
        } else {
            setIsThree(false)
        }

    }, [current])

    return (
        <div className={classes.counter}>
            <MicIcon className={classes.icon}/>
            <div className={classes.icon} style={isOne ? {color: 'white'} : {color: 'grey'}} ref={refElem1}>3</div>
            <div className={classes.icon} style={isTwo ? {color: 'white'} : {color: 'grey'}} ref={refElem2}>2</div>
            <div className={classes.icon} style={isThree ? {color: 'white'} : {color: 'grey'}} ref={refElem3}>1</div>
        </div>
    );
};

export default CountDown;
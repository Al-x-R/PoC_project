import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import MicIcon from '@material-ui/icons/Mic';
import {observer} from 'mobx-react-lite';
import {MenuStore} from '../../stores/menu';

const useStyles = makeStyles({
    timer: {
        display: 'flex',
        alignItems: 'center',
    },
    timerItem: {
        fontSize: 20,
        color: 'white',
        padding: '3px'
    }
});

const Timer = observer(() => {
    const classes = useStyles()

    const [second, setSecond] = useState('00');
    const [minute, setMinute] = useState('00');
    const [hour, setHour] = useState('00');
    const [counter, setCounter] = useState(1);

    useEffect(() => {
        let intervalId: any;

        if (MenuStore.isStartRecording) {
            intervalId = setInterval(() => {

                const computedSecond = `0${(counter % 60)}`.slice(-2);
                const minutes: string = `${Math.floor(counter / 60)}`
                const computedMinute = `0${Number(minutes) % 60}`.slice(-2);
                const computedHour = `0${Math.floor(counter / 3600)}`.slice(-2);

                setSecond(String(computedSecond));
                setMinute(String(computedMinute));
                setHour(String(computedHour));

                setCounter(counter => counter + 1);
            }, 1000)
        }

        return () => {
            clearInterval(intervalId)
        };
    }, [counter])

    return (
        <div className={classes.timer}>
            <MicIcon/>
            <span className={classes.timerItem}>{hour}</span>
            <span>:</span>
            <span className={classes.timerItem}>{minute}</span>
            <span>:</span>
            <span className={classes.timerItem}>{second}</span>
        </div>
    );
});

export default Timer;
import React, {useEffect, useState} from 'react';
import Typography from '@material-ui/core/Typography';
import MicIcon from '@material-ui/icons/Mic';

const iconStyle = {
    fontSize: 50
}

const blockStyle = {
    display: 'flex',
    alignItems: 'center',
    color: 'grey'
}
// TODO set the color corresponding to the timer

const CountDown = () => {
    const [current, setCurrent] = useState(4)

    useEffect(() => {
        const interval = setInterval(() => {
            if (current > 0) {
                setCurrent(current => current - 1);
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [current]);


    return (
        <div style={blockStyle}>
            <MicIcon style={iconStyle} />
            <Typography style={iconStyle}>1</Typography>
            <Typography style={iconStyle}>2</Typography>
            <Typography style={iconStyle}>3</Typography>
            <h1>{current}</h1>
        </div>
    );
};

export default CountDown;
import React, {FC, useEffect, useState} from 'react';
import {useReactMediaRecorder} from 'react-media-recorder';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MicIcon from '@material-ui/icons/Mic';
import {yellow} from '@material-ui/core/colors'
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {makeStyles} from '@material-ui/core/styles';

import {observer} from 'mobx-react-lite';
import {MenuStore} from '../../stores/menu';
import {AudioStore} from '../../stores/audio';
import CountDown from '../CountDown/CountDown';
import Timer from '../Timer/Timer';


const useStyles = makeStyles({
    toolBarStyles: {
        backgroundColor: 'white',
        color: 'black',
        display: 'flex',
        justifyContent: 'space-between'
    },
    startRecordingButtonStyles: {
        backgroundColor: yellow[600],
        borderRadius: '8px'
    }
});

const stopRecordingButtonStyles = {
    backgroundColor: 'white',
    borderRadius: '8px',
    color: 'black'
}

export type PropTypes = {
    pageId?: number,
    pageNumber?: number,
}

const AudioRecorder: FC<PropTypes> = observer(({}) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const {
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
    } = useReactMediaRecorder({video: false});

    const handlerStartRecordButtonClick = () => {
        MenuStore.switchIsCountDown(true)
    }

    const handlerStopRecordButtonClick = () => {
        stopRecording()
        MenuStore.switchIsStartRecording(false)
        handleClickOpen()
    }

    useEffect(() => {
        if (MenuStore.isStartRecording) {
            startRecording()
        }
    }, [MenuStore.isStartRecording])

    const saveAudio = () => {
        if (mediaBlobUrl) {
            AudioStore.addAudio(mediaBlobUrl)
            MenuStore.toggleIsAudio(false)
            setOpen(false);
        }
    }

    return (
        <div>
            <AppBar position="static">
                <Toolbar className={classes.toolBarStyles}
                         style={(MenuStore.isCountDown || MenuStore.isStartRecording) ? {
                             backgroundColor: 'red',
                             color: 'white'
                         } : {backgroundColor: 'white'}}>
                    {(!MenuStore.isCountDown && !MenuStore.isStartRecording) ?
                        <IconButton edge="start" color="inherit" aria-label="menu"
                                    onClick={() => MenuStore.toggleIsAudio(false)}>
                            <ArrowBackIosIcon/> Cancel
                        </IconButton> : <div/>
                    }

                    {(!MenuStore.isCountDown && !MenuStore.isStartRecording) &&
                    <Typography variant="h6">
                      Record Sound
                    </Typography>
                    }
                    {MenuStore.isCountDown && <CountDown/>}
                    {(MenuStore.isStartRecording) && <Timer/>}

                    {(!MenuStore.isStartRecording && !MenuStore.isCountDown) &&
                    <Button className={classes.startRecordingButtonStyles}
                            onClick={handlerStartRecordButtonClick}><MicIcon/>Start Recording
                    </Button>}
                    {MenuStore.isCountDown && <div/>}
                    {MenuStore.isStartRecording &&
                    <Button style={stopRecordingButtonStyles}
                            onClick={handlerStopRecordButtonClick}><MicIcon/>Stop Recording
                    </Button>}

                </Toolbar>
            </AppBar>
            {mediaBlobUrl &&
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">Do you want to use this recording?</DialogTitle>
              <DialogContent>
                <audio src={mediaBlobUrl} controls/>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                  Delete
                </Button>
                <Button onClick={saveAudio} color="primary" autoFocus>
                  USE RECORDING
                </Button>
              </DialogActions>
            </Dialog>
            }
        </div>
    );
})

export default AudioRecorder;
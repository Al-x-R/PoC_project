import React, {useState} from 'react';
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
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";

import {observer} from "mobx-react-lite";
import {MenuStore} from "../../stores/menu";
import {AudioStore} from "../../stores/audio";

const toolBarStyles = {
    backgroundColor: 'white',
    color: 'black',
    display: 'flex',
    justifyContent: 'space-between'
}

const recordButtonStyles = {
    backgroundColor: yellow[600],
    borderRadius: '8px'
}

const AudioRecorder = observer(() => {
    const [isRecording, setIsRecording] = useState(false)
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

    const recordButtonTitle = isRecording ? 'Stop Recording' : 'Start Recording'

    const handlerRecordButtonClick = () => {
        if (!isRecording) {
            setIsRecording(true)
            startRecording()
        } else {
            setIsRecording(false)
            stopRecording()
            handleClickOpen()
        }
    }

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
                <Toolbar style={toolBarStyles}>
                    <IconButton edge="start" color="inherit" aria-label="menu" onClick={() => MenuStore.toggleIsAudio(false)}>
                        <ArrowBackIosIcon/> Cancel
                    </IconButton>
                    <Typography variant="h6">
                        Record Sound
                    </Typography>
                    <Button style={recordButtonStyles} onClick={handlerRecordButtonClick}><MicIcon/>{recordButtonTitle}
                    </Button>
                </Toolbar>
            </AppBar>
            {/*<p>{status}</p>*/}
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
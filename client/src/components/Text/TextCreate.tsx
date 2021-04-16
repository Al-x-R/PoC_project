import React, {FC, useState} from 'react';
import {Button} from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {makeStyles} from "@material-ui/core/styles";
import TextFieldsIcon from "@material-ui/icons/TextFields";

import {Editor} from 'react-draft-wysiwyg';
import {EditorState} from 'draft-js';
import {convertToHTML} from 'draft-convert';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import CurrentBookStore from '../../stores/сurrentBookStore'

const useStyles = makeStyles({
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    },
    dialog: {
        width: 350
    }
});

const TextCreate: FC = () => {
    const classes = useStyles();

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const [convertedContent, setConvertedContent] = useState('');
    const [open, setOpen] = useState(false);

    const handleEditorChange = (state: any) => {
        setEditorState(state);
        convertContentToHTML();
    }

    const convertContentToHTML = () => {
        // @ts-ignore
        let currentContentAsHTML = convertToHTML(editorState.getCurrentContent());
        // @ts-ignore
        setConvertedContent(currentContentAsHTML);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const done = () => {
        CurrentBookStore.addText(convertedContent)
        setOpen(false);
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                <TextFieldsIcon/> Text
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogContent dividers className={classes.dialog}>
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={handleEditorChange}
                        toolbarClassName="toolbarClassName"
                        wrapperClassName="wrapperClassName"
                        editorClassName="editorClassName"
                        toolbar={{
                            options: ['inline'],
                            inline: {
                                options: ['bold', 'italic', 'underline']
                            }
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button autoFocus onClick={done} color="primary">
                        done
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default TextCreate;
import React, {useState, FC, useRef, useEffect} from 'react';
import { Button, TextField } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import {makeStyles} from "@material-ui/core/styles";
import FormatBoldIcon from '@material-ui/icons/FormatBold';
import FormatItalicIcon from '@material-ui/icons/FormatItalic';
import FormatUnderlinedIcon from '@material-ui/icons/FormatUnderlined';
import TextFieldsIcon from "@material-ui/icons/TextFields";

import {TextItemImpl} from "../../stores/text";

interface TextsListProps {
    textStore: TextItemImpl,
}

const useStyles = makeStyles({
    underline: {
        "&&&:before": {
            borderBottom: "none"
        },
        "&&:after": {
            borderBottom: "none"
        }
    },
});

const TextCreate: FC<TextsListProps> = ({textStore}) => {
    const classes = useStyles();
    const [inputText, setInputText] = useState('')
    const [selection, setSelection] = useState()

    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [isUnderline, setIsUnderline] = useState(false)

    const [open, setOpen] = useState(false);


    const inputRef = useRef<HTMLInputElement | null>(null)
    if (inputRef.current?.selectionStart || inputRef.current?.selectionStart === null) {
        let startpos = inputRef.current?.selectionStart;
        let endpos = inputRef.current.selectionEnd;

        inputRef.current.value  = inputRef.current.value.substring(Number(startpos)) + inputText + inputRef.current.value.substring(Number(endpos), inputRef.current.value.length);
        inputRef.current.focus();

        // @ts-ignore
        setSelection(inputRef.current.value)

    }
    console.log(selection)

    // let cursorStart = inputRef.current?.selectionStart;
    // console.log('start', cursorStart)
    // let cursorEnd = inputRef.current?.selectionEnd;
    // console.log('end', cursorEnd)

    // console.log('selection', selection)

    const handleChange = ( e: any ) => {
        setInputText(e.target.value)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const done = () => {
        textStore.addText(inputText)
        setOpen(false);
    }

    const onBoldClick = () => {
        setIsBold(!isBold)
        if (isBold) {
            return `<b>${inputText}</b>`
        }
    }

    const onItalicClick = () => {
        setIsItalic(!isItalic)
        if (isItalic) {
            return `<i>${inputText}</i>`
        }
    }

    const onUnderlineClick =() => {
        setIsUnderline(!isUnderline)
        if (isUnderline) {
            return `<u>${inputText}</u>`
        }
    }

    return (
        <div>
            <Button onClick={handleClickOpen}>
                <TextFieldsIcon/> Text
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title">
                    <FormatBoldIcon onClick={onBoldClick}
                                    style={{ fontSize: isBold ? 27 : 23,}}
                    />
                    <FormatItalicIcon onClick={onItalicClick}
                                      style={{ fontSize: isItalic ? 27 : 23 }}
                    />
                    <FormatUnderlinedIcon onClick={onUnderlineClick}
                                          style={{ fontSize: isUnderline ? 27 : 23 }}
                    />
                </DialogTitle>
                <DialogContent dividers>
                    <TextField
                        ref={inputRef}
                        autoFocus
                        onChange={handleChange}
                        value={inputRef?.current?.value}
                        margin="dense"
                        multiline
                        id="text"
                        InputProps={{
                            classes, style: {
                                fontWeight: isBold ? 'bold' : 'normal',
                                fontStyle: isItalic ? 'italic' : 'normal',
                                textDecoration: isUnderline ? 'underline' : 'none',
                            }
                        }}
                        fullWidth
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
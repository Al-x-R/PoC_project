import React, {useState, FC, useRef, useEffect} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
    ref: HTMLElement | null
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
    const [value, setValue] = useState('')

    const [isBold, setIsBold] = useState(false)
    const [isItalic, setIsItalic] = useState(false)
    const [isUnderline, setIsUnderline] = useState(false)

    const [open, setOpen] = React.useState(false);

    const inputRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        inputRef.current
    },[])
    // console.log(inputRef.current)

    // let cursorStart = textVal.selectionStart;
    // let cursorEnd = textVal.selectionEnd;
    // this.state.textareaVal.substring(cursorStart,cursorEnd)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const done = () => {
        textStore.addText(value)
        setOpen(false);
    }

    const onBoldClick = () => {
        setIsBold(!isBold)
        if (isBold) {
            return `<b>${value}</b>`
        }
    }

    const onItalicClick = () => {
        setIsItalic(!isItalic)
        if (isItalic) {
            return `<i>${value}</i>`
        }
    }

    const onUnderlineClick =() => {
        setIsUnderline(!isUnderline)
        if (isUnderline) {
            return `<u>${value}</u>`
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
                        onChange={(e) => setValue(e.target.value)}
                        value={value}
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
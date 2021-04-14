import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';
import TextCreate from '../Text/TextCreate';

import {observer} from "mobx-react-lite";
import {MenuStore} from "../../stores/menu";

const iconColor = { color: 'white'}

export const TopBarMenu = observer(() => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handlerVoiceMenuClick = () => {
        MenuStore.toggleIsAudio(true)
        setAnchorEl(null);
    }

    return (
        <div>
            <Button fullWidth aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <AddIcon style={iconColor}/>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><TextCreate /></MenuItem>
                <MenuItem onClick={handlerVoiceMenuClick}><SettingsVoiceIcon/> Record</MenuItem>
            </Menu>
        </div>
    );
})

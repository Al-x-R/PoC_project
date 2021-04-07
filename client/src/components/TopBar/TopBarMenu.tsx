import React, {FC, useState} from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import AddIcon from '@material-ui/icons/Add';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import SettingsVoiceIcon from '@material-ui/icons/SettingsVoice';

const iconColor = { color: 'white'}

export const TopBarMenu: FC = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
                <AddIcon style={iconColor}/>
            </Button>
            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}><TextFieldsIcon/> Text</MenuItem>
                <MenuItem onClick={handleClose}><SettingsVoiceIcon/> Record</MenuItem>
            </Menu>
        </div>
    );
}

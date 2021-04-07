import React, {FC} from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import {TopBarMenu} from './TopBarMenu';

const toolBarStyle = {
    display: 'flex',
    justifyContent: 'space-between'
}

const linkStyle = {
    textDecoration: 'none',
    padding: '10px',
     color: 'white'
}

 const TopBar: FC = () => {

    return (
        <AppBar position="static">
            <Toolbar style={toolBarStyle}>
                <div style={toolBarStyle}>
                    <Button  style={linkStyle} component={Link} to='/edit'>
                        Edit Book
                    </Button>
                    <Button  style={linkStyle} component={Link} to='/'>
                        Read Book
                    </Button>
                </div>

                <TopBarMenu />
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
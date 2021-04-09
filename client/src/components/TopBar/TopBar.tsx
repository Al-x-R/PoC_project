import React, {useEffect, useState} from 'react';
import {Link, useLocation} from 'react-router-dom';
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

const TopBar = () => {
    const [isEdit, setIsEdit] = useState(false)
    const location = useLocation();

    useEffect(() => {
        setIsEdit(location.pathname === '/edit');
    }, [location.pathname]);

    return (
        <AppBar position="static">
            <Toolbar style={toolBarStyle}>
                <div style={toolBarStyle}>
                    <Button style={linkStyle} component={Link} to='/edit'>
                        Edit Book
                    </Button>
                    <Button style={linkStyle} component={Link} to='/'>
                        Read Book
                    </Button>
                </div>
                {isEdit && <TopBarMenu/>}
            </Toolbar>
        </AppBar>
    );
};

export default TopBar;
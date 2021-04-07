import React from 'react';
import Paper from '@material-ui/core/Paper';
import Picture from "../Picture/Picture";

const paperStyle = {
    width: '500px',
    height: '500px',
    border: 'solid',
    // overflow: 'hidden'
}

const Page = () => {

    return (
        <div>
            <Paper style={paperStyle}>
                <Picture />
            </Paper>
        </div>
    );
};

export default Page;
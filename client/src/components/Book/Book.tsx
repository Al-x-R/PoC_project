import React from 'react';
import Page from "../Page/Page";

const pageStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '150px'
}

const Book = () => {
    return (
        <div style={pageStyle}>
            <Page />
        </div>
    );
};

export default Book;
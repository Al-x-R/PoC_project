import React, {FC} from 'react';
import Page from "../Page/Page";
import {TextStore} from "../../stores/text";

const pageStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '150px'
}

const Book: FC = () => {
    return (
        <div style={pageStyle}>
            <Page textStore={TextStore}/>
        </div>
    );
};

export default Book;
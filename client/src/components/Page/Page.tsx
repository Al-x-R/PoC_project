import React, {FC} from 'react';
import Paper from '@material-ui/core/Paper';
import Picture from '../Picture/Picture';
import TextComponent from '../Text/TextComponent';

import {observer} from 'mobx-react-lite';
import {TextItemImpl} from '../../stores/text';

const paperStyle = {
    width: '500px',
    height: '500px',
    border: 'solid',
    // overflow: 'hidden'
}

interface TextsListProps {
    textStore: TextItemImpl
}

const Page: FC<TextsListProps> = observer(({textStore}) => {

    return (
        <div>
            <Paper style={paperStyle}>
                <Picture/>
                {textStore.texts.map(t => {
                    return <TextComponent key={t.id} textItem={t}/>
                })}
            </Paper>
        </div>
    );
});

export default Page;
import React from 'react';

const pictureStyles = {
    width: '300px',
    height: '200px',
    objectFit: 'cover'
} as React.CSSProperties

const Picture = () => {
    return (
        <div style={pictureStyles}>
            <img style={pictureStyles} src='https://res.cloudinary.com/css-tricks/image/fetch/w_1200,q_auto,f_auto/https://css-tricks.com/wp-content/uploads/2020/09/react-suspense.png' alt='picture'/>
        </div>
    );
};

export default Picture;
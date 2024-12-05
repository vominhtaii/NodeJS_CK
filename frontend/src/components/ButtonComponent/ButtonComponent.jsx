import React from 'react';
import {  Button } from 'antd';

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disable, ...rests }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disable ? '#ccc': styleButton.background
            }}
            size={size}
            {...rests} 
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    );
}

export default ButtonComponent;

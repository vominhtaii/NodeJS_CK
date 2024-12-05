import React from 'react';
import { BackTop, Button } from 'antd';

const ButtonComponent = ({ size, styleButton, styleTextButton, textButton, disable, ...rests }) => {
    return (
        <Button
            styles={{
                ...styleButton,
                background:disable ? '#ccc': styleButton.background
            }}
            size={size}
            {...rests} 
        >
            <span style={styleTextButton}>{textButton}</span>
        </Button>
    );
}

export default ButtonComponent;

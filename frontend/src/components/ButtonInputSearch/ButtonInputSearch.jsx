import React from 'react';
import { SearchOutlined } from '@ant-design/icons'
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) =>{
    const {
        size, 
        placeholder, 
        textButton, 
        bordered=false, 
        backgroundColorInput = '#fff', 
        BackgroundColorButton = 'rgb(13,92,182)',
        colorButton = '#fff'
    } = props
    return(
        <div style={{display:'flex', backgroundColor:"#fff"}}>
            <InputComponent 
                size={size} 
                placeholder={placeholder} 
                bordered={bordered} 
                style={{backgroundColor:backgroundColorInput}}
            />
            <ButtonComponent 
                size={size} 
                styleButton={{backgroundColor:BackgroundColorButton}} 
                icon={<SearchOutlined  color={colorButton} style={{color:'#fff'}}/>}
                textButton={textButton}
                styleTextButton={{color: colorButton}}
            />
        </div>
    )
}

export default ButtonInputSearch
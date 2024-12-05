import React from "react";
import { WrapperInputStyle } from "./style";

const InputForm  = ( props) => {
    const {placeholder ="Nhập text", ...rests} = props
    const handleOnchangeInput =(e)=>{
        props.Onchange(e.target.value)
    }
    return (
        <WrapperInputStyle placeholder={placeholder} value={props.value} {...rests}onChange={handleOnchangeInput}/>
    )
}

export default InputForm 
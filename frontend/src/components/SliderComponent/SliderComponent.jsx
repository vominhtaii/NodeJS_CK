import {Image} from  'antd';
import React from 'react'
import { WrapperSliderStyle } from './style';


const SliderComponent = ({arrImages}) => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay:true,
        autplaySpeed: 1000
    };
    return (
        <WrapperSliderStyle {...settings}>
            {arrImages.map((image) => {
                return (
                    <Image src={image} alt="slider" preview={false} width="100%" height="274px"/>
                )
            })}
        </WrapperSliderStyle>
    )
}

export default SliderComponent
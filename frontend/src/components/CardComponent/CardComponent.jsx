import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperPriceText, WrapperReportText} from './style'
import {StarFilled} from '@ant-design/icons'
import logo from '../../assets/images/logo.png'
import { WrapperStyleTextSell } from '../ProductDetailsComponent/style'

const CardComponent = () => {
    return (
        <WrapperCardStyle
            hoverable
            style={{ 
                width: 240,
                header: { width: '200px', height: '200px' }, // This line is not valid for styles
            }}
            bodystyle={{padding:'10px'}}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <img 
                src={logo} 
                style={{
                    width:'68px', height:'14px', position:'absolute',  top:-1, left: -1,
                    borderTopLeftRadius: '3px'
                }}
                alt='logo'
            />
            <StyleNameProduct>Iphone</StyleNameProduct>
            <WrapperReportText>
                <span style={{marginRight: '4px'}}>
                    <span>4.96</span><StarFilled style={{fontSize:'12px', color:'yellow'}}/>
                </span>
                <WrapperStyleTextSell>| Sold 1000+</WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{marginRight:'8px'}}>1.000.000 Đ</span>
                <WrapperDiscountText>
                    -5%
                </WrapperDiscountText>
            </WrapperPriceText>
        </WrapperCardStyle>
    )
}

export default CardComponent
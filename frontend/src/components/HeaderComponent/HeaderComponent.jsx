// HeaderComponent.js
import React from 'react';
import {WrapperTextHeaderSmall,WrapperHeader, WrapperHeaderAccout, WrapperTextHeader}from'./style'
import {Col, Badge}from 'antd'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import {UserOutlined,CaretDownOutlined,ShoppingCartOutlined,} from '@ant-design/icons';

const HeaderComponent = () => {
  return ( 
    <div style={{width:'100%', background:'rgb(26,148,255)', display:'flex', justifyContent:'center'}}>
      <WrapperHeader>
        <Col span={6}>
          <WrapperTextHeader>SIÊU SAO</WrapperTextHeader> 
        </Col>
        <Col span={12}>
          <ButtonInputSearch
            size="large"
            textButton="Tìm kiếm"
            placeholder="Bạn cần gì?"
          />
        </Col>
        <Col span={6} style={{display:'flex', gap: '54px',alignItems:'center'}}>
          <WrapperHeaderAccout>
            <UserOutlined style={{fontSize: '30px'}}/>
              <div>
                <WrapperTextHeaderSmall>Đăng nhập/Đăng kí</WrapperTextHeaderSmall>
                <div>
                  <WrapperTextHeaderSmall>Tài khoản</WrapperTextHeaderSmall>
                  <CaretDownOutlined />
                </div>
              </div>
            </WrapperHeaderAccout>
            <div>
            <Badge count={4} size="small">
              <ShoppingCartOutlined style={{fontSize: '30px', color:'#fff'}}/>
            </Badge>
            <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
            </div>
        </Col>
      </WrapperHeader> 
    </div> 
    )
}

export default HeaderComponent;

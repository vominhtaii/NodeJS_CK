// HeaderComponent.js
import React from 'react';
import {WrapperTextHeaderSmall,WrapperHeader, WrapperHeaderAccout, WrapperTextHeader}from'./style'
import {Col}from 'antd'
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import {UserOutlined,CaretDownOutlined,ShoppingCartOutlined,} from '@ant-design/icons';

const HeaderComponent = () => {
  return ( 
    <div>
      <WrapperHeader gutter={16}>
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
        <Col span={6} style={{display:'flex', gap: '20px',alignItems:'center'}}>
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
          <ShoppingCartOutlined style={{fontSize: '30px', color:'#fff'}}/>
          <WrapperTextHeaderSmall>Giỏ hàng</WrapperTextHeaderSmall>
          </div>
        </Col>
      </WrapperHeader> 
    </div> 
    )
}

export default HeaderComponent;

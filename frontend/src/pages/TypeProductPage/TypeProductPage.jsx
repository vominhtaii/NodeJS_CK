import React from "react";
import NavBarComponent from "../../components/NavbarComponent/NavbarComponent";
import CardComponent from "../../components/CardComponent/CardComponent";
import { Col, Pagination, Row } from "antd";
import {WrapperProducts,WrapperNavbar} from './style'
const TypeProductPage = () => {
    const onChange = () => { }
    return (
        <div style={{padding: '0 120px', background:'#efefef'}}>
            <Row style={{ flexWrap:'nowrap', paddingTop: '10px' }}>
                <WrapperNavbar span={4}>
                    <NavBarComponent/>
                </WrapperNavbar>
                <Col>
                    <WrapperProducts span={20}>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </WrapperProducts>
                    <Pagination defaultCurrent={2} total={500} onChange={onChange} style={{textAlign:'center', marginTop: '10px'}}/>
                </Col>
            </Row>
        </div>
    )
}

export default TypeProductPage
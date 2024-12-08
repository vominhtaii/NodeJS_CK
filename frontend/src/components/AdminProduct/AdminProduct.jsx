import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React from "react";
import { WrapperHeader } from "./style";
import TableComponent from "../TableComponent/TableComponent";

const AdminProduct =()=>{
    return(
        <div>
            <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
            <div style={{marginTop:'10px'}}>
                <Button style={{height:'150px', width:'150px',borderRadius:'6px', borderStyle:'dashed'}}><PlusOutlined style={{fontSize:'60px'}}></PlusOutlined></Button>
            </div>
            <div style={{marginTop:'20px'}}>
                <TableComponent/>
            </div>
        </div>
    )
}
export default AdminProduct
import React, { useState } from 'react';
import { Menu } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faUser } from '@fortawesome/free-solid-svg-icons';
import { faProductHunt } from '@fortawesome/free-brands-svg-icons';
import AdminComponentUser from '../../components/AdminComponentUser/AdminComponentUser';
import AdminComponentProduct from '../../components/AdminComponentProduct/AdminComponentProduct';
import OrderAdminComponent from '../../components/OrderAdminComponent/OrderAdminComponent';

const Admin = () => {
    const [current, setCurrent] = useState('1');
    const [keySelected, setKeySelected] = useState('')
    const onClick = (e) => {
        setCurrent(e.key);
        setKeySelected(e.key)
    };

    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminComponentUser />
                )
            case 'product':
                return (
                    <AdminComponentProduct/>
                )
            case 'order':
                return(
                    <OrderAdminComponent/>
                )
            default: return <> </>
        }
    }
    const items = [
        {
            key: 'user',
            label: 'Thông tin User',
            icon: <FontAwesomeIcon icon={faUser} />,
        }, {
            key: 'product',
            label: 'Sản Phẩm',
            icon: <FontAwesomeIcon icon={faProductHunt} />,
        },{
            key: 'order',
            label: 'Quản lí đơn hàng',
            icon: <FontAwesomeIcon icon={faCartShopping} />,
        },

    ];
    return (
        <>
            <div style={{ display: 'flex' }}>
                <Menu
                    theme={'light'}
                    onClick={onClick}
                    style={{
                        width: 256,
                        boxShadow: '1px 1px 2px #ccc',
                        height: '100vh'
                    }}
                    defaultOpenKeys={['sub1']}
                    selectedKeys={[current]}
                    mode="inline"
                    items={items}
                />
                <div style={{display: 1, padding: '15px'}}>
                    {renderPage(keySelected)}
                </div>
            </div>
        </>
    )
}

export default Admin

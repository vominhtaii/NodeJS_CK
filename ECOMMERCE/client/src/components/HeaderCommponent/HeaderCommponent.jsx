import React, { useEffect, useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Dropdown, DropdownButton } from 'react-bootstrap';
import './header.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faCartShopping, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Link, useNavigate } from 'react-router-dom';
import ButtonSearch from '../ButtonSearch/ButtonSearch';
import { useDispatch, useSelector } from 'react-redux';
import * as UserService from '../../Service/UserService'
import { resetUser } from '../../redux/silde/userSlide';
import * as message from '../MessagComponent/MessagComponent'
import { searchProduct } from '../../redux/silde/productSlide';
import { Badge } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';

export default function HeaderCommponent() {
  const user = useSelector(state => state.user)
  const order = useSelector(state => state.order)
  const dispatch = useDispatch();
  const [userName, setuserName] = useState('')
  const [avatar, setAvatar] = useState(user?.avatar)
  const [isDisable, setIsdisable] = useState(true)
  const [isDisableUser, setIsDisableUser] = useState(true)

  const dispatchLogout = async () => {
    try {
      localStorage.removeItem('acces_token');
      dispatch(resetUser());
      const res = await UserService.logOutUser()
      if (res.status === 'OK') {
        message.success('Đăng Xuất Thành Công')
      }
    } catch (error) {
      console.error('Error logging out', error);
    }
  };
  const navigate = useNavigate()

  const handleLogout = () => {
    UserService.logOutUser()
    dispatchLogout()
  }
  useEffect(() => {
    setuserName(user?.name)
    setAvatar(user?.avatar)
  }, [user?.name, user?.avatar])
  useEffect(() => {
    setIsdisable(!user?.id)
    setIsDisableUser(!user?.id)
  }, [user])

  const OnchangeSearch = (e) => {
    dispatch(searchProduct(e.target.value))
  }
 
  return (
    <div style={{ width: '100%', background: 'rgb(26,148,255)', display: 'flex', justifyContent: 'center' }}>
      <Navbar bg="dark" variant="dark" className=''>
        <Nav className="mr-auto">
          <Nav.Link onClick={() => navigate('/')}>Trang chủ</Nav.Link>
          <Nav.Link onClick={() => navigate('/my-order')}>Đơn hàng</Nav.Link>
        </Nav>
        <Form className='d-flex'>
          <FormControl type="text" placeholder="Search" className="ml-10 justify-content-center Input-search" onChange={OnchangeSearch} />
          <ButtonSearch variant="outline-info" className='ml-2 buttonsearch'>
            <FontAwesomeIcon icon={faSearch} /> Search
          </ButtonSearch>
        </Form>
        <div className="header-container">
          <div className="user-info">
            <img src={avatar} className="user-avatar" alt="User Avatar" />
            <div className="user-name">{userName?.length ? user?.name : user?.email}</div>
          </div>
          <DropdownButton id="dropdown-basic-button" className='dropDown' title={<FontAwesomeIcon icon={faUser} />}>
            <Dropdown.Item onClick={() => navigate('/login')}>Đăng nhập</Dropdown.Item>
            <Dropdown.Item onClick={() => navigate('/register')}>Đăng ký</Dropdown.Item>
            <Dropdown.Item onClick={() => navigate('/proflie')}>Thông tin</Dropdown.Item>
            {user?.isAdmin &&
              (<Dropdown.Item onClick={() => navigate('/admin')} disabled={isDisableUser}>Quản Lý Hệ Thống</Dropdown.Item>)
            }
            <Dropdown.Item onClick={handleLogout} disabled={isDisable}>Đăng xuất</Dropdown.Item>
          </DropdownButton>
        </div>
        <Navbar.Brand as={Link} to='/cart' className='ms-4'>
          <FontAwesomeIcon icon={faCartShopping} /> </Navbar.Brand>
        <Badge count={user?.id !== '' ? order?.orderItems?.length : 0} style={{ fontSize: '10px', marginBottom: '30px' }} size='small'>
          <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
        </Badge>
      </Navbar>
    </div>
  )
}

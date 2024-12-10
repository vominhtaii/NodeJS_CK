import React, { useEffect, useMemo, useState } from 'react'
import style from './change.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping, faCartShopping, faQuestion, faSearch, faSearchLocation, faSearchPlus, faUser } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux'
import * as UserService from '../../Service/UserService'
import { searchProduct } from '../../redux/silde/productSlide'
import * as message from '../../components/MessagComponent/MessagComponent'
import { useNavigate } from 'react-router-dom'
import { resetUser } from '../../redux/silde/userSlide'
import { Badge, Tooltip } from 'antd'
const cx = classNames.bind(style)
const ChangeHeader = () => {
  const user = useSelector(state => state.user)
  const order = useSelector(state => state.order)
  const dispatch = useDispatch();
  const [userName, setuserName] = useState('')
  const [avatar, setAvatar] = useState(user?.avatar)
  const [isDisable, setIsdisable] = useState(true)
  const [isDisableUser, setIsDisableUser] = useState(true)
  const dataUserId = order?.users?.[user?.id]
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
  const text = <div>
    <div
      className={cx('tooltip--header')}
      onClick={() => navigate('/proflie')}
    >Tài khoản của tôi</div>
    {user?.isAdmin && (
      <div
        className={cx('tooltip--header')}
        onClick={() => navigate('/admin')}
      >
        Quản lí user
      </div>
    )}
    <div
      className={cx('tooltip--header')}
      onClick={() => navigate('/my-order')}
    >Đơn mua</div>
    <div
      className={cx('tooltip--header')}
      onClick={handleLogout}
    >Đăng xuất</div>
  </div>;
  console.log('order',dataUserId)
  return (
    <div style={{width:'100%'}}>
      <header className={cx('header')}>
      <div className={cx('header__with--search')}>
            <div className={cx('header__logo')} onClick={() => navigate('/')}>
              <FontAwesomeIcon style={{ marginRight: '8px', marginBottom: '3px'}} icon={faBagShopping} />
              3T SHOP
            </div>
            <div className={cx('header__search')}>
              <input className={cx('input--search')} type="text" placeholder='Nhập từ khóa tìm kiếm' onChange={OnchangeSearch}/>
              <div className=''>
                <button className={cx('btn--search')}><FontAwesomeIcon icon={faSearch} /></button>
              </div>
            </div>
            <div className={cx('header__cart')}>
              <Badge
                count={user?.id !== '' ? dataUserId?.orderItems?.length : 0} style={{ fontSize: '10px', marginBottom: '30px' }} size='small'
                onClick={() => navigate('/cart')}
              >
                <FontAwesomeIcon className={cx('icon__cart')} icon={faCartShopping} />
              </Badge>
            </div>
            <div>
            {(user?.name || user?.avatar) ? (
                <>
                  <Tooltip style={{ width: '500px' }} className={cx('tooltip')} placement="bottom" title={text}>
                    <li className={cx('header__navbar--item')}>
                      {user?.avatar ?
                        (<img className={cx('navbar__avatar')} src={user?.avatar} alt="avatar" />) :
                        <FontAwesomeIcon icon={faUser} />}
                    </li>
                    <li className={cx('header__navbar--item')} style={{ fontWeight: '550' }}>{user?.name}</li>
                  </Tooltip>
                </>
              ) : (
                <>
                  <li
                    className={cx('header__navbar--item', 'item--bold', 'item--sperate')}
                    onClick={() => navigate('/register')}
                  >Đăng kí</li>
                  <li
                    className={cx('header__navbar--item', 'item--bold')}
                    onClick={() => navigate('/login')}
                  >Đăng nhập</li>
                </>
              )}
            </div>
          </div>
      </header >
    </div >
  )
}

export default ChangeHeader

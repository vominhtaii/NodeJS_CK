import React, { useEffect, useRef, useState } from 'react'
import classNames from 'classnames/bind'
import styles from './UserAdmin.module.scss'
import { Button, Form, Input, Space } from 'antd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
import TableComponent from '../TableComponent/TableComponent'
import ModalComponent from '../ModalComponent/ModalComponent'
import { useMutationHook } from '../../hooks/useMutationHook'
import * as UserService from '../../Service/UserService'
import * as message from '../MessagComponent/MessagComponent'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words'
import { useQuery } from '@tanstack/react-query'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../LoadingComponent/Loading'
import { updateUser as updateUserRedux } from '../../redux/silde/userSlide'

const cx = classNames.bind(styles)
const AdminComponentUser = () => {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenUpdate, setisModalOpenUpdate] = useState(false)
  const [isModalOpenDelete, setisModalOpenDelete] = useState(false)
  const [getDetailEmail, setGetDetailEmail] = useState('')
  const [ValueinputUser, setValueInputUser] = useState({ name: '', email: '', password: '', phone: '' })
  const [valueInputUpdateUser, setValueInputUpdateUser] = useState({ name: '', email: '', password: '', phone: '', isAdmin: '' })
  const [loadingAdd, setLoadingAdd] = useState(false)
  const [rowSelected, setRowSelected] = useState('')
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const mutation = useMutationHook(data => UserService.RegisterUser(data))
  const mutationUpdate = useMutationHook(({ id, data }) => UserService.updateUser(id, data))
  const mutationDelete = useMutationHook(({ id, acces_token }) => UserService.deleteUser(id, acces_token))
  const mutationDeleteMany = useMutationHook(({ data, acces_token }) => UserService.deleteUserMany(data, acces_token))
  const messageDelete = mutationDelete?.data?.status === 'ok'
  const messageUpdate = mutationUpdate?.data?.status === 'OK'
  const messgeAddUser = mutation?.data?.status === 'OK'
  const messageDeleteMany = mutationDeleteMany?.data?.status === 'OK'
  const user = useSelector(state => state.user)
  const dispatch = useDispatch()
  const { acces_token } = user

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const handleOnClickTrash = (e) => {
    setisModalOpenDelete(true)
  }

  const fetchDetaiUser = async () => {
    const res = await UserService.getDetailsUser(rowSelected, user?.acces_token)

    if (res?.data) {
      const { name, email, password, phone, isAdmin } = res?.data
      setValueInputUpdateUser({
        name,
        email,
        password,
        phone,
        isAdmin
      })
      setGetDetailEmail(res?.data?.email)
    }
  }

  useEffect(() => {
    if (rowSelected) {
      fetchDetaiUser()
    }
  }, [rowSelected])

  useEffect(() => {
    form.setFieldsValue(valueInputUpdateUser)
    setLoadingUpdate(false)
  }, [form, valueInputUpdateUser])

  const handleOnclickSquare = () => {
    if (rowSelected) {
      fetchDetaiUser()
    }
    setisModalOpenUpdate(true)
    setLoadingUpdate(true)

  }

  const renderAction = () => {
    return (
      <div>
        <Button style={{ width: '40px', color: 'red', fontSize: '18px' }} onClick={handleOnClickTrash}>
          <FontAwesomeIcon icon={faTrash} />
        </Button>
        <Button style={{ marginLeft: '18px', width: '40px', fontSize: '18px' }} onClick={handleOnclickSquare}>
          <FontAwesomeIcon icon={faPenToSquare} />
        </Button>
      </div>
    )
  }
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: (a, b) => a.name.length - b.name.length,
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      sorter: (a, b) => a.email.length - b.email.length
    },
    {
      title: 'Password',
      dataIndex: 'password',
      sorter: (a, b) => a.password.length - b.password.length
    },
    {
      title: 'Admin',
      dataIndex: 'isAdmin',
      render: (isAdmin) => (isAdmin ? 'TRUE' : 'FALSE')
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      sorter: (a, b) => a.phone.length - b.phone.length
    }, {
      title: 'Hoạt động',
      dataIndex: 'description',
      render: renderAction
    }
  ];

  const fetchGetAllUser = async () => {
    const res = await UserService.getAllUser(acces_token)
    return res
  }
  const getAllUser = useQuery({
    queryKey: ['user'],
    queryFn: fetchGetAllUser,
    retry: 3,
    retryDelay: 1000
  })
  const { data: allUser } = getAllUser

  useEffect(() => {
    if (messgeAddUser) {
      message.success('Add thành công User')
      setIsModalOpen(false);
      setLoadingAdd(false)
      handleCancelAddUser()
    }
  }, [messgeAddUser])

  useEffect(() => {
    if (messageUpdate) {
      message.success('Update thành công User')
    }
  }, [messageUpdate])


  useEffect(() => {
    if (messageDelete) {
      message.success('Delete thành công User')
    }
  }, [messageDelete])

  useEffect(() => {
    if (messageDeleteMany) {
      message.success('DeleteMany thành công User')
    }
  }, [messageDeleteMany])
  const OnchangeUser = (e) => {
    console.log('e target', e.target)
    setValueInputUser({
      ...ValueinputUser,
      [e.target.name]: e.target.value
    })
  }

  const OnchangeUserUpdate = (e) => {
    setValueInputUpdateUser({
      ...valueInputUpdateUser,
      [e.target.name]: e.target.value
    })
  }
  const handleOk = () => {
    setLoadingAdd(true)
    mutation.mutate({
      ...ValueinputUser,
      confirmPassWord: ValueinputUser.password
    }, {
      onSettled: () => getAllUser.refetch()
    })
  };
  console.log('user', user)
  const handleOkUpdate = () => {
    const { acces_token,
      address,
      avatar,
      id
    } = user
    dispatch(updateUserRedux({
      ...valueInputUpdateUser,
      acces_token,
      address,
      avatar,
      id
    }))
    mutationUpdate.mutate({ id: rowSelected, data: valueInputUpdateUser }, {
      onSettled: () => getAllUser.refetch()
    })
    handleCancelUpdateUser()
  }
  const handleOkDelete = () => {
    mutationDelete.mutate({
      id: rowSelected,
      acces_token: user?.acces_token
    }, {
      onSettled: () => getAllUser.refetch()
    })
    setisModalOpenDelete(false)
  }
  const handleCancelUpdateUser = () => {
    setisModalOpenUpdate(false)
    setValueInputUpdateUser({
      name: '', email: '', password: '', phone: '', isAdmin: ''
    })
    form.resetFields(); // Reset the form fields
  }
  const handleCancelAddUser = () => {
    setValueInputUser({
      name: '', email: '', password: '', phone: ''
    })
    form.resetFields(); // Reset the form fields
  }

  const handleDeleteAllUser = (Ids) => {
    mutationDeleteMany.mutate({
      data: { id: Ids, },
      acces_token: user?.acces_token
    }, {
      onSettled: () => getAllUser.refetch()
    })
  }
  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <h1 className={cx('header')}>User</h1>
        <Button style={{ marginLeft: '20px', fontSize: '15px' }} onClick={() => setIsModalOpen(true)}><FontAwesomeIcon icon={faPlus} /> Add</Button>
      </div>
      <div>
        <TableComponent handleDeleteAllUser={handleDeleteAllUser} columns={columns} isLoading={loadingAdd} dataValue={allUser?.data} onRow={(record, index) => {
          return {
            onClick: () => {
              return setRowSelected(record._id)
            }
          }
        }} />
      </div>
      <ModalComponent title="Add User" open={isModalOpen} onOk={handleOk} onCancel={() => setIsModalOpen(false)}>
        <Form
          name="basic"
          labelCol={{
            span: 6,
          }}
          wrapperCol={{
            span: 18,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="name"
          >
            <Input onChange={OnchangeUser} name='name' />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
          >
            <Input onChange={OnchangeUser} name='email' />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
          >
            <Input onChange={OnchangeUser} name='password' />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
          >
            <Input type="number" onChange={OnchangeUser} name='phone' />
          </Form.Item>
        </Form>
        {mutation?.data?.status === 'Error' && (
          <div style={{ marginTop: '10px', color: 'red' }}>
            {mutation?.data?.message}
          </div>)}
      </ModalComponent>
      <ModalComponent title="Update User" open={isModalOpenUpdate} onOk={handleOkUpdate} onCancel={() => setisModalOpenUpdate(false)}>
        <Loading isLoading={loadingUpdate}>
          <Form
            name="basic"
            form={form}
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            style={{
              maxWidth: 600,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="Name"
              name="name"
            >
              <Input onChange={OnchangeUserUpdate} name='name' />
            </Form.Item>

            <Form.Item
              label="Email"
              name="email"
            >
              <Input onChange={OnchangeUserUpdate} name='email' />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
            >
              <Input onChange={OnchangeUserUpdate} name='password' />
            </Form.Item>

            <Form.Item
              label="Phone"
              name="phone"
            >
              <Input type="number" onChange={OnchangeUserUpdate} name='phone' />
            </Form.Item>

            <Form.Item
              label="Admin"
              name="isAdmin"
            >
              <Input onChange={OnchangeUserUpdate} name='isAdmin' />
            </Form.Item>
          </Form>
        </Loading>

        {mutation?.data?.status === 'Error' && (
          <div style={{ marginTop: '10px', color: 'red' }}>
            {mutation?.data?.message}
          </div>)}
      </ModalComponent>
      <ModalComponent title='Bạn có chắc là muốn xóa tài khoản này chứ?' open={isModalOpenDelete} onCancel={() => setisModalOpenDelete(false)} onOk={handleOkDelete}>
        {rowSelected && (
          <p style={{ display: 'flex', justifyContent: 'center', fontSize: '25px' }}>Email: {getDetailEmail}</p>
        )}
      </ModalComponent>
    </>

  )
}

export default AdminComponentUser

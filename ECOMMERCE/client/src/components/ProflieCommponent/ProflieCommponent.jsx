import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import ListGroup from 'react-bootstrap/ListGroup';
import { useDispatch, useSelector } from 'react-redux';
import { updateUser } from '../../Service/UserService';
import { useMutationHook } from '../../hooks/useMutationHook';
import * as message from '../MessagComponent/MessagComponent'
import { getBase64 } from '../../utils';
import { Upload } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { updateUser as updateUserRedux } from '../../redux/silde/userSlide'

const ProflieCommponent = () => {
    const user = useSelector(state => state.user);
    const dispatch = useDispatch()
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [avatar, setAvatar] = useState({ preview: '' });
    const [isDisable, setIsdesable] = useState(true)
    const mutation = useMutationHook((data) => {
        const { id, ...rets } = data
        updateUser(id, data)
        return updateUser(id, rets)  // Chú ý trả về promise từ hàm updateUser
    })
    const { data } = mutation
    const messageSuccess = data?.status === 'OK'
    useEffect(() => {
        setName(user?.name)
        setEmail(user?.email)
        setPassword(user?.password)
        setPhone(user?.phone)
        setAddress(user?.address)
        setAvatar(user?.avatar)
        setIsdesable(!user?.id)
    }, [user])

    useEffect(() => {
        if (messageSuccess) {
            message.success('Cập nhật thành công')
            dispatch(updateUserRedux({ id: user?.id, name, email, password, phone, address, avatar, acces_token: user?.acces_token, isAdmin: user?.isAdmin }))
        }
    }, [messageSuccess])

    const handleOnchangeName = (e) => {
        setName(e.target.value)
    }
    const handleOnchangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleOnchangePassWord = (e) => {
        setPassword(e.target.value)
    }
    const handleOnchangePhone = (e) => {
        setPhone(e.target.value)
    }

    const handleOnchangeAddress = (e) => {
        setAddress(e.target.value)
    }

    const handleChangeAvatar = async (info) => {
        const file = info.fileList[0];
        if (!file) {
            return;
        }
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setAvatar(file.preview);
    };
    const handleUpdate = () => {
        mutation.mutate({
            id: user?.id,
            name,
            email,
            password,
            phone,
            address,
            avatar
        })
    }
    console.log('user.name', user.name)
    return (
        <section style={{ backgroundColor: '#eee' }}>
            <Container fluid className="py-5">
                <Row>
                    <Col>
                        <Breadcrumb aria-label="breadcrumb">
                        </Breadcrumb>
                    </Col>
                </Row>

                <Row>
                    <Col lg={4}>
                        <Card mb={4}>
                            <Card.Body className="text-center">
                                {avatar && (
                                    <img src={avatar} style={{ height: '100px', width: '100px', borderRadius: '50%' }} alt='avatar' />
                                )}
                                <Card.Title className="my-3">{user?.name}</Card.Title>
                                <Card.Text className="text-muted mb-1">Wellcome!</Card.Text>
                                <Card.Text className="text-muted mb-4">Ho Chi Minh, VIETNAM</Card.Text>
                                <div className="d-flex justify-content-center align-items-center mb-2" >
                                    <Upload onChange={handleChangeAvatar} disabled={isDisable}>
                                        <Button style={{marginRight:'5px'}}> <FontAwesomeIcon icon={faUpload} /> Click to Upload</Button>
                                    </Upload>
                                    <Button style={{ background: 'red' }} onClick={handleUpdate} disabled={isDisable}>Update </Button>
                                </div>
                            </Card.Body>
                        </Card>
                        <Card>
                            <Card.Body className="p-0">
                                <ListGroup rounded={3}>
                                    <ListGroup.Item className="d-flex justify-content-between align-items-center p-3">
                                        <i className="fas fa-globe fa-lg text-warning"></i>
                                    </ListGroup.Item>
                                    {/* Add more list group items here */}
                                </ListGroup>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col lg={8}>
                        <Card mb={4}>
                            <Card.Body>
                                {/* User details here */}
                                <Row className="d-flex align-items-center">
                                    <Col sm={2}>
                                        <p className="mb-0 text-center justify-content-center ms-5">Name</p>
                                    </Col>
                                    <Col sm={8}>
                                        <input
                                            type="text"
                                            onChange={(e) => handleOnchangeName(e)}
                                            value={name}
                                            className="form-control me-5"
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <button className="btn btn-primary" onClick={handleUpdate} disabled={isDisable}>Update</button>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className="d-flex align-items-center">
                                    <Col sm={2}>
                                        <p className="mb-0 text-center justify-content-center ms-5">Email</p>
                                    </Col>
                                    <Col sm={8}>
                                        <input
                                            onChange={e => handleOnchangeEmail(e)}
                                            type="text"
                                            value={email}
                                            className="form-control me-5"
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <button onClick={handleUpdate} className="btn btn-primary" disabled={isDisable}>Update</button>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className="d-flex align-items-center">
                                    <Col sm={2}>
                                        <p className="mb-0 text-center justify-content-center ms-5">Password</p>
                                    </Col>
                                    <Col sm={8}>
                                        <input
                                            type="text"
                                            onChange={e => handleOnchangePassWord(e)}
                                            value={password}
                                            className="form-control me-5"
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <button onClick={handleUpdate} className="btn btn-primary" disabled={isDisable}>Update</button>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className="d-flex align-items-center">
                                    <Col sm={2}>
                                        <p className="mb-0 text-center justify-content-center ms-5">Phone</p>
                                    </Col>
                                    <Col sm={8}>
                                        <input
                                            type="text"
                                            onChange={e => handleOnchangePhone(e)}
                                            value={phone}
                                            className="form-control me-5"
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <button onClick={handleUpdate} className="btn btn-primary" disabled={isDisable}>Update</button>
                                    </Col>
                                </Row>
                                <hr />
                                <Row className="d-flex align-items-center">
                                    <Col sm={2}>
                                        <p className="mb-0 text-center justify-content-center ms-5" disabled={isDisable}>Address</p>
                                    </Col>
                                    <Col sm={8}>
                                        <input
                                            value={address}
                                            onChange={e => handleOnchangeAddress(e)}
                                            type="text"
                                            className="form-control me-5"
                                        />
                                    </Col>
                                    <Col sm={2}>
                                        <button onClick={handleUpdate} className="btn btn-primary" disabled={isDisable}>Update</button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </section>
    );
};

export default ProflieCommponent;
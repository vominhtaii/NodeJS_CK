import {Modal } from 'antd'
import React from 'react'

const ModalComponent = ({ title, open , onOk, onCancel, children ,...props}) => {
    return (
        <div>
            <Modal title={title} open={open} onOk={onOk} onCancel={onCancel} {...props}>
                {children}
            </Modal>
        </div>
    )
}

export default ModalComponent

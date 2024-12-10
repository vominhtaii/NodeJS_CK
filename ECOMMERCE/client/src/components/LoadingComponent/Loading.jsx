import { Spin } from 'antd'
import React from 'react'

const Loading = ({children, isLoading, delay = 2000}) => {
    return (
        <div>
            <Spin tip="Loading..." spinning={isLoading} delay={delay}>
                    {children}
            </Spin>
        </div>
    )
}

export default Loading

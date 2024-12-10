import { Steps } from 'antd'
import React from 'react'

const Step = () => {
    const description = 'This is a description.';
    return (
        <div>
            <Steps
                current={1}
                items={[
                    {
                        title: 'Finished',
                        description,
                    },
                    {
                        title: 'In Progress',
                        description,
                        subTitle: 'Left 00:00:08',
                    },
                    {
                        title: 'Waiting',
                        description,
                    },
                ]}
            />
        </div>
    )
}

export default Step

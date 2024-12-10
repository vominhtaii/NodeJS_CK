import { Drawer } from 'antd'
import React, { useState } from 'react'

const DrawerComponent = ({children, title = 'Drawer', placement = 'right', isOpen = 'false', ...props}) => {
    const [open, setOpen] = useState(false);
  return (
    <div>
       <Drawer title={title}  open={isOpen} placement={placement} {...props}>
            {children}
      </Drawer>
    </div>
  )
}

export default DrawerComponent

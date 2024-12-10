import React from 'react'
import { Button } from 'react-bootstrap'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const ButtonSearch = ({variant,className, children,...props}) => {
  return (
    <div>
          <Button variant={variant} className={className} {...props} > {children} </Button>
    </div>
  )
}

export default ButtonSearch

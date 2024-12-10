import React from 'react'

const Comment = ({dataHerf, width}) => {
  return (
    <div class="fb-comments" data-href={dataHerf} data-width={width} data-numposts="5"></div>
  )
}

export default Comment

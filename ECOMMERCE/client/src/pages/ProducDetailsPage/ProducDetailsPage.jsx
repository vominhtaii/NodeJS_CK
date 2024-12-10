import React from 'react'
import ProductDetailComponent from '../../components/ProductDetailComponent/ProductDetailComponent'
import { useNavigate, useParams } from 'react-router-dom'

const ProducDetailsPage = () => {
  const param = useParams()
  const { id } = param
  return (
    <div style={{display:'flex', justifyContent:'center'}}>
      <ProductDetailComponent idProduct={id} />
    </div>
  )
}

export default ProducDetailsPage

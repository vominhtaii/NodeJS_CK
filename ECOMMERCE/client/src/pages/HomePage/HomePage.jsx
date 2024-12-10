import React, { useEffect, useRef, useState } from 'react'
import SliderCommponent from '../../components/SliderCommponent/SliderCommponent';
import CardCommponent from '../../components/CardCommponent/CardCommponent';
import * as productService from '../../Service/ProductService'
import { useQuery } from '@tanstack/react-query';
import { Col, Container, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import { useDebounce } from '../../hooks/useDebounce';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';
export default function HomePage() {
  const searchValueProduct = useSelector(state => state?.product?.search)
  const navigate = useNavigate()
  const [loangdingSearch, setLoadingSearch] = useState(false)
  const [limit, setLimit] = useState(5)
  const searchDebounce = useDebounce(searchValueProduct, 1000)

  const fetchProductAll = async (context) => {
    const limit = context?.queryKey && context?.queryKey[1]
    const search = context?.queryKey && context?.queryKey[2]
    const res = await productService.getAllProduct(search, limit)
    return res
  }

  const { isLoading, data: product } = useQuery({
    queryKey: ['products', limit, searchDebounce],
    queryFn: fetchProductAll,
    retry: 3,
    retryDelay: 1000,
    keepPreviousData: true
  })

  const fetchProductAllType = async () => {
    const res = await productService.getAllType()
    return res
  }
  const { data: productType } = useQuery({
    queryKey: ['products-type'],
    queryFn: fetchProductAllType,
    retry: 3,
    retryDelay: 1000,
  })

  const handleClickType = (nameType) => {
    const formattedNameType = nameType.replace(/\s+/g, '_'); // ko can cung dc:)))
    const encodedUrl = encodeURIComponent(formattedNameType);
    navigate(`/product-type/${encodedUrl}`);
  }
  return (
    <div style={{ margin: '0 auto' }}>
      <Loading isLoading={isLoading || loangdingSearch}>
        <div style={{width:'1270px', margin:'0 auto', padding:'10px', paddingBottom:'0px'}}>
        <span style={{ marginLeft: '30px', marginTop: '20px', fontWeight: '500', fontSize: '20px', cursor:'pointer' }} onClick={() => navigate('/')}>Trang chủ</span>
        {productType?.data?.map(product => (
          <span style={{ fontWeight: '500', fontSize: '20px', marginLeft: '15px' , cursor:'pointer'}} onClick={() => handleClickType(product)}>{product}</span>
        ))}
        </div>
        <SliderCommponent />
        <div style={{ width: '1190px', maxWidth: '100%', margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyItems:'center' }}>
            {product?.data?.map((product) => (
              <div key={product._id} style={{ padding: '10px', boxSizing: 'border-box'}}>
                <CardCommponent
                  id={product._id}
                  name={product.name}
                  image={product.image}
                  type={product.type}
                  price={product.price}
                  rating={product.rating}
                  description={product.description}
                  countInStock={product.countInStock}
                  selled={product.selled}
                />
              </div>
            ))}
          </div>
        </div>
      </Loading >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', alignContent: 'center', margin: '20px' }}>
        <Button disabled={product?.totalProduct === product?.data?.length || product?.totalPage === 1} style={{ fontWeight: '700' }} onClick={() => setLimit(prev => prev + 6)}>Xem Thêm</Button>
      </div>
    </div >
  );
}

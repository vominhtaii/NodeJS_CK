import React from 'react';
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperTypeProduct } from './style';
const HomePage = () =>{
    const arr = ['Bàn phím','Chuột', 'Tai nghe', 'Lót chuột']
    return(
        <div style={{padding: '0 120px'}}>
            <WrapperTypeProduct>
            {
                arr.map((item) =>{
                    return(
                        <TypeProduct name={item} key={item}/>
                    )
                })
            }
            </WrapperTypeProduct>
            HomePage
        </div>
    )
}

export default HomePage
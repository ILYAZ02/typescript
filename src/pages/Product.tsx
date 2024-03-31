import React, { useContext, useEffect } from 'react'
import { ModalContext } from '../Context'
import ProductRow from './ProductRow'
import Search from '../components/Search'
const Product = () => {

    const {getProduct} = useContext(ModalContext)

    useEffect(() => {
        getProduct()
    })

    
  return (
    <div>
        <Search/>
        <ProductRow/>
    </div>

  )
}

export default Product
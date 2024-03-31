import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import {IProduct} from '../Interface/Iproduct'
import { ModalContext } from "../Context";
const Params = () => {
    const [productParams, setProductParams] = useState<IProduct>()
    const params = useParams()
    const {addToCart} = useContext(ModalContext)

    useEffect(() => {
        axios.get<IProduct>(`https://example-data.draftbit.com/products/${params.id}`)
          .then(({data}) => setProductParams(data))
      }, [])

    return (
        <div>
            <div>
                {productParams && 
                    <div key={productParams.id}>
                        <img width={300} src={productParams.image_url} alt="" />
                        <h3>{productParams.name}</h3>
                        <h2>{productParams.description}</h2>
                        <h4> price: <i>{productParams.list_price} $</i> <b>{productParams.sale_price} $</b> </h4>
                        <button onClick={() => addToCart(productParams)}>Add to card</button>

                    </div>
                }
            </div>
        </div>
    )
}

export default Params
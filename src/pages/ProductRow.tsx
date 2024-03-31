import React, { useContext } from 'react'
import { ModalContext } from '../Context'
import { FaCartArrowDown } from "react-icons/fa"
import {NavLink} from "react-router-dom";

const ProductRow = () => {
  const { product,addToCart } = useContext(ModalContext)

  return (
    <div>
      {product.map((item) => (
        <div>
           <NavLink to={`/params/${item.id}`}>
          <img style={{ width: "100px" }} src={item.image_url} alt="" />
          </NavLink>
          {item.price}
          {item.name}
          <button onClick={() => addToCart(item)} aria-label="add to shopping cart">
            <FaCartArrowDown />
          </button>
        </div>
      ))}
    </div>
  )
}

export default ProductRow
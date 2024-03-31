import React, {useContext} from 'react';
import {ModalContext} from "../Context";
import {NavLink} from "react-router-dom";
import { CiCircleRemove } from "react-icons/ci";
import { GrAdd } from "react-icons/gr"
import { VscRemove } from "react-icons/vsc"
import { MdDeleteOutline } from "react-icons/md"

const Cart = () => {
    const {
        cart,
        removeProduct,
        clearProduct,
        increaseAmount ,
        decreaseAmount,
        total
    } = useContext(ModalContext);
    return (

        <div className='cart'>
            {cart.length ? (
                <div>
                    {cart.map(item => (
                        <div className='item' key={item.id}>
                            <div className='item_product'>
                                <NavLink to={`/params/${item.id}`}>
                                    <img src={item.image_url} alt=""/>
                                </NavLink>
                                <NavLink to={`/params/${item.id}`}>
                                    {item.name}
                                </NavLink>

                            </div>

                                <div className='item_amount'>
                                    <p> {item.list_price} $</p>
                                    <div className='item_amount_block'>
                                        <span onClick={() => decreaseAmount(item.id)}><VscRemove /></span>
                                        <p>{item.amount}</p>
                                        <span onClick={() => increaseAmount(item.id)}><GrAdd /></span>
                                    </div>
                                    <button onClick={() => removeProduct(item.id)}><CiCircleRemove /></button>
                                </div>



                        </div>
                    ))}

                    <div className='total_block'>
                        <span>total price <b>{(total).toFixed(2)} $</b></span>

                        <div className='total_block_btn'>

                                <NavLink to='/'>Proceed to checkout</NavLink>

                            <button onClick={clearProduct}>
                                <MdDeleteOutline />
                            </button>
                        </div>
                    </div>
                </div>
                ):(
                    <div className='cart_null'>

                        <h1>У вас нет заказов </h1>

                    </div>

            )}




        </div>

    );
};

export default Cart;

import React, { useContext } from 'react'
import s from './Header.module.scss'
import { NavLink } from 'react-router-dom'
import { ModalContext } from "../Context";
import { IoArrowBackSharp } from "react-icons/io5"
import { FaShoppingBasket } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
const Header = () => {
    const { cartStateAmount, goBack } = useContext(ModalContext)

    return (
        <div className={s.menu}>
            <ul>
                <button onClick={goBack}><IoArrowBackSharp /></button>

                <div className={s.menu_logo}><a href='/'>logo</a></div>

                <a href="/product">tovar</a>
                <a href="">menu</a>
            </ul>
            <p>korz</p>
            <NavLink to='/cart'><FaHeart />0</NavLink>
            <NavLink to='/cart'><FaShoppingBasket />{cartStateAmount}</NavLink>


        </div>
    )
}

export default Header
import { useState, useEffect } from 'react'
import { IProduct } from './Interface/Iproduct'
import React, { createContext } from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom";


interface IModalContext {
    product: IProduct[]
    getProduct: () => void
    searchProducts: (query: string) => void; 
    
    goBack: () => void
    cart: IProduct[]
    addToCart: (product: IProduct) => void
    removeProduct: (id: number) => void
    clearProduct: () => void
    increaseAmount: (id: number) => void
    decreaseAmount: (id: number) => void
    cartStateAmount: number
    total: number
}


export const ModalContext = createContext<IModalContext>({
    product: [],
    getProduct: async () => {},
    searchProducts: () => {},
    goBack: () => {},
    cart: [],
    addToCart: () => {},
    removeProduct: () => {},
    clearProduct: () => {},
    increaseAmount: () => {},
    decreaseAmount: () => {},
    cartStateAmount: 0,
    total: 0
})

export const ModalState: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [product, setProduct] = useState<IProduct[]>([])
    const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);

    const navigate = useNavigate()
    const goBack = () => navigate(-1)

    const getProduct = async () => {
        try {
            const res = await axios.get<IProduct[]>("https://example-data.draftbit.com/products/")
            setProduct(res.data)
        } catch (error) {
            console.error("product error", error)
        }
    }

    const searchProducts = (query: string) => {
        const filtered = product.filter((product) =>
            product.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredProducts(filtered);
    };
    

    const [cart, setCart] = useState<IProduct[]>([])

    const addToCart = (product: IProduct) => {
        const newItem = { ...product, amount: 1 }

        const cartItem = cart.find(item => item.id === product.id)

        if (cartItem) {
            const newCart = cart.map(item =>
                item.id === product.id ? { ...item, amount: item.amount + 1 } : item
            )
            setCart(newCart)
        } else {
            setCart([...cart, newItem])
        }
    }

    const removeProduct = (id: number) => {
        setCart(cart.filter(item => item.id !== id))
    }

    const clearProduct = () => {
        setCart([])
    }

    const increaseAmount = (id: number) => {
        const cartItem = cart.find(item => item.id === id)
        if (cartItem) {
            addToCart(cartItem)
        }
    }
    const decreaseAmount = (id: number) => {
        const cartItem = cart.find((item) => {
            return item.id === id
        })
        if (cartItem) {
            const newCart = cart.map(item => {
                if (item.id === id) {
                    return {...item, amount: cartItem.amount -1}
                }else {
                    return item
                }
            })
            setCart(newCart)

            if (cartItem.amount < 2) {
                removeProduct(id)
            }
        }
    }

    const [cartStateAmount, setCartStateAmount] = useState(0)

    useEffect(() => {
        if (cart) {
            const amount = cart.reduce((accumulator, currentItem) => {
                return accumulator + currentItem.amount
            }, 0)
            setCartStateAmount(amount)
        }
    },[cart])



    const [ total, setTotal] = useState(0)

    useEffect(() => {
        const total = cart.reduce((accumulator, currentItem) => {
            return accumulator + currentItem.list_price * currentItem.amount
        }, 0)
        setTotal(total)
    })

    
    
    const values ={
        goBack,
        product:filteredProducts,
        cart,
        getProduct,
        searchProducts,
        addToCart,
        removeProduct,
        clearProduct,
        increaseAmount,
        decreaseAmount,
        cartStateAmount,
        total

    }


    return (
        <ModalContext.Provider value={values}>
            {children}
        </ModalContext.Provider>
    )
}
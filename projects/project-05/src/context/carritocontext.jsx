//! EN ESTE ARCHIVO TENGO AMBAS MANERAS DE MANEJAR EL ESTADO DEL CARRITO, CON REDUCER Y CON CONTEXTO

import { useReducer } from "react";
import { useState } from "react";
import { createContext } from "react";

export const CarritoContext = createContext()

const initialState = []
const reducer = (state, action) => {

    const { type: actionType, payload: actionPayload } = action

    switch (actionType) {
        case 'ADD_TO_CART': {
            const { id } = actionPayload
            const productInCartIndex = state.findIndex(item => item.id === id)
            if (productInCartIndex >= 0) {
                const newState = structuredClone(state)
                newState[productInCartIndex].quantity += 1
                return newState
            } else {

                return [...state,
                {
                    ...actionPayload,
                    quantity: 1
                }
                ]
            }
        }
        case 'REMOVE_FROM_CART': {
            const { id } = actionPayload
            return state.filter(item => item.id !== id)
        }
        case 'CLEAR_CART': {
            return initialState
        }
    }

    return state
}

export const CarritoProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    const addToCart = (newProduct) => dispatch(
        {
            type: 'ADD_TO_CART',
            payload: newProduct
        }
    )

    const removeFromCart = product => dispatch(
        {
            type: 'REMOVE_FROM_CART',
            payload: product
        }
    )

    const clearCart = () => dispatch(
        {
            type: 'CLEAR_CART'
        }
    )
    

    // const [cart, setCart] = useState([])
    // const addToCart = (newProduct) => {
    //     const productInCartIndex = cart.findIndex(item => item.id === newProduct.id)
    //     if (productInCartIndex >= 0) {
    //         const newCart = structuredClone(cart)
    //         newCart[productInCartIndex].quantity += 1
    //         setCart(newCart)
    //     } else {
    //         setCart(prevState => (
    //             [...prevState,
    //             {
    //                 ...newProduct,
    //                 quantity: 1
    //             }
    //             ]
    //         ))
    //     }
    // }

    // const checkProductInCart = product => {
    //     return cart.some(item => item.id === product.id)
    // }

    // const removeFromCart = product => {
    //     setCart(prevState => (
    //         prevState.filter(item => item.id !== product.id)
    //     ))
    // }

    // const clearCart = () => {
    //     setCart([])
    // }

    return (
        <CarritoContext.Provider
            value={
                {
                    cart,
                    addToCart,
                    clearCart,
                    checkProductInCart,
                    removeFromCart
                }
            }
        >
            {children}
        </CarritoContext.Provider>
    )
}
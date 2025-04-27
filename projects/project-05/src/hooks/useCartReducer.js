import { useReducer } from 'react'
import { initialState, CartReducer } from '../reducers/CartReducer'

export const useCartReducer = () => {
    const [state, dispatch] = useReducer(CartReducer, initialState)

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

    return {
        state,
        addToCart,
        removeFromCart,
        clearCart
    }
}
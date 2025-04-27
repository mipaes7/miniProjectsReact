import { createContext } from 'react';
import { useCartReducer } from '../hooks/useCartReducer';

export const CarritoContext = createContext()

export const CarritoProvider = ({ children }) => {
    const { state, addToCart, removeFromCart, clearCart } = useCartReducer()

    return (
        <CarritoContext.Provider
            value={
                {
                    cart: state,
                    addToCart,
                    clearCart,
                    removeFromCart
                }
            }
        >
            {children}
        </CarritoContext.Provider>
    )
}
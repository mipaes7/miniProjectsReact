import { useContext } from "react"
import { CarritoContext } from "../context/carrito"


export const UseCarrito = () => {

    const cartContext = useContext(CarritoContext)

    if (cartContext === undefined) {
        throw new Error('useCart must be used within a CartProvider')
    }

    return cartContext
}
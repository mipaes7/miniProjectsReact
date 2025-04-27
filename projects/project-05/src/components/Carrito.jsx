import { useId } from 'react'
import { CartIcon } from './icons'
import './Carrito.css'
import { UseCarrito } from '../hooks/useCarrito'

const CartItem = ({thumbnail, addToCart, title, price, quantity}) => {
    return (
        <li>
            <img src={thumbnail} alt={title} />
            <div>
                <strong>{title}</strong> - {price}€
            </div>
            {
                quantity > 1
                ? <small>Total: {Number(price)*quantity}€</small>
                : ''
            }
            <footer>
                <small>
                    Qty: {quantity}
                </small>
                <button onClick={addToCart}>+</button>
            </footer>
        </li>
    )
}

export const Carrito = () => {
    const cartCheckboxId = useId()
    const { addToCart, cart, clearCart } = UseCarrito()

    return (
        <>
            <label className='cart-button' htmlFor={cartCheckboxId}>
                <CartIcon />
            </label>
            <input id={cartCheckboxId} type='checkbox' hidden />
            <aside className='cart'>
                <ul>
                    {
                        cart.map(item => (
                            <CartItem key={item.sku} {...item} addToCart={() => addToCart(item)}/>
                        ))
                    }
                </ul>
                {
                    cart.length >= 1
                    ? <button onClick={clearCart}> Eliminar productos del carrito </button>
                    : <p>No hay productos en el carrito</p>
                }
            </aside>
        </>
    )
}
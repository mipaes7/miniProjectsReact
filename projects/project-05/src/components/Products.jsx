import { UseCarrito } from '../hooks/useCarrito'
import { AddToCartIcon, RemoveFromCartIcon } from './icons'
import './Products.css'

export const Products = ({ products }) => {

    const { addToCart, removeFromCart, cart } = UseCarrito()
    const checkProductInCart = product => {
        return cart.some(item => item.id === product.id)
    }

    return (
        <main className='products'>
            <ul>
                {
                    products.slice(0, 10).map(product => (
                        <li key={product.id}>
                            <img src={product.thumbnail} alt={product.title} />
                            <div>
                                <strong>{product.title}</strong> - {product.price}€
                            </div>
                            <div>
                                <button
                                    style={{ backgroundColor: checkProductInCart(product) ? 'red' : '#09f' }}
                                    onClick={() => {
                                        checkProductInCart(product)
                                            ? removeFromCart(product)
                                            : addToCart(product)
                                    }}
                                >
                                    {
                                        checkProductInCart(product)
                                            ? <RemoveFromCartIcon />
                                            : <AddToCartIcon />
                                    }
                                </button>
                            </div>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}
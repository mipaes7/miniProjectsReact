import { UseCarrito } from '../hooks/useCarrito'
import { useFilters } from '../hooks/useFilters'
import './Footer.css'

export function Footer () {
  const { filters } = useFilters()
  const { cart } = UseCarrito()

  return (
    <footer className='footer'>
      {/* <h4>Prueba técnica de React ⚛️ － <span>@midudev</span></h4>
      <h5>Shopping Cart con useContext & useReducer</h5> */}
      {/* <p>{JSON.stringify(filters)}</p> */}
      {/* <p>{JSON.stringify(cart, null, 2)}</p> */}
    </footer>
  )
}
import { useState } from 'react'
import { Products } from './components/Products'
import { products as initalProducts } from './mocks/products.json'
import { Header } from './components/Header'
import { Footer } from './components/Footer'
import { useFilters } from './hooks/useFilters'
import { Carrito } from './components/Carrito'
import { CarritoProvider } from './context/carrito'

function App() {
  
  const [products] = useState(initalProducts)
  const { filterProducts, filters } = useFilters()
  
  const filteredProducts = filterProducts(products)

  return (
    <CarritoProvider>
      <h1>Proyecto carrito Redux</h1>
      <hr />
      <Header />
      <Carrito />
      <Products products={filteredProducts} />
      <Footer />
    </CarritoProvider>
  )
}

export default App

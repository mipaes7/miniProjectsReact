import { useState, useId } from 'react'
import { useFilters } from '../hooks/useFilters'
import './Filters.css'

export const Filters = ({changeFilters}) => {
    const { filters, setFilters } = useFilters()
    const minPriceFilterId = useId()
    const categoryFilterId = useId()

    const handleChangeMinPrice = ({target}) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: target.value
        }))
    }

    const handleCategoryChange = ({target}) => {
        setFilters(prevState => ({
            ...prevState,
            category: target.value
        }))
    }

    return (
        <section className='filters'>
            <div>
                <label htmlFor={minPriceFilterId}>Precio</label>
                <input type='range' id={minPriceFilterId} min='0' max='500' onChange={handleChangeMinPrice} />
                <span>{filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={categoryFilterId}>Categoría</label>
                <select id={categoryFilterId} onChange={handleCategoryChange}>
                    <option value='all'>Todas</option>
                    <option value='beauty'>Belleza</option>
                    <option value='fragrances'>Perfumes</option>
                    <option value='furniture'>Muebles</option>
                </select>
            </div>
        </section>
    )
}
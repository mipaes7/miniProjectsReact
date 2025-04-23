import { useRef, useState } from 'react'

export const useSearch = () => {
    const inputRef = useRef()
    const [query, setQuery] = useState('')
    const [error, setError] = useState(null)
  
    const handleSubmit = (event) => {
      event.preventDefault()
      const inputElement = inputRef.current
      const value = inputElement.value
      console.log(value)
    }
  
    //* Múltiples inputs
    /*
    const handleSubmit = () => {
      event.preventDefault()
      const fields = Object.fromEntries(new window.FormDate(event.target))
      //* fields es un objeto con todos los values de los inputs que tengan atributo name
      const { inputName1Value, inputName2Value .... } = Object.fromEntries(new window.FormDate(event.target))
      }
      */
     //* Usando js
     /*
     const handleSubmit = () => {
      event.preventDefault()
      const fields = new window.FormDate(event.target)
      const query = fields.get('query')
      //* query contiene el valor del input cuyo name es query
    }
    */
  
    const handleChange = ({target}) => {
  
      const newQuery = target.value
      setQuery(newQuery)
  
      if (newQuery === '') {
        setError('No se puede buscar una película vacía')
        return
      }
  
      if (newQuery.match(/^\d+$/)) {
        setError('No se puede buscar solo números')
        return
      }
  
      if (newQuery.length < 3) {
        setError('Búsqueda mayor que 3')
        return
      }
  
      setError(null)
    }
  
    return {
      inputRef,
      query,
      error,
      handleChange,
      handleSubmit
    }
  }
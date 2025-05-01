import { Children, useEffect, useState } from 'react'
import { EVENTS } from './consts'
import { match } from 'path-to-regexp'

export const Router = ({ children, routes = [], defaulComponent: DefaultComponent = () => null }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.addEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  // añadir rutas de componentes children <Route />
  const routesFromChildren = Children.map(children, ({props, type}) => {
    const { name } = type
    const isRoute = name === 'Route'

    return isRoute ? props : null
  })
  
  const routeToUse = routes.concat(routesFromChildren).filter(Boolean)

  // find path === currentPath devuelve un elemento de routes, accede a foundelement.Component
  const PageToRender = routeToUse.find(({ path }) => {

    if (path === currentPath) return true

    // con path-to-regexp detectamos rutas dinámicas
    // eg: /search/:query
    const matcherUrl = match(path, { decode: decodeURIComponent })
    const matched = matcherUrl(currentPath)
    if (!matched) return false
    
    // se guardan los params de la url que eran dinámicos
    // eg /search/:query --> /search/termstosearch
    // matched.params.query === termstosearch
    routeParams = matched.params
    return true
  })?.Component

  return PageToRender ? <PageToRender routeParams={routeParams} /> : <DefaultComponent routeParams={routeParams} />
}
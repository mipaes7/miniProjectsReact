import { EVENTS } from "./consts"

export const navigate = (href) => {
  window.history.pushState({}, '', href)
  // crear un evento personalizado
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

export const Link = ({target, to, ...props}) => {
    const handleClick = (event) => {
        
        const isMainEvent = event.button === 0
        const isModifiedEvent = event.metaKey || event.altKey || event.ctrlKey || event.shiftKey
        const isManageableEvent = target === undefined ||target === '_self'
        
        if (isMainEvent && isManageableEvent && !isModifiedEvent) {
            event.preventDefault()
            navigate(to)
        }

    }

    return <a onClick={handleClick} href={to} target={target} {...props}></a>
}
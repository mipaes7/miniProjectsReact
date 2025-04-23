import { useEffect, useState } from 'react'

export const useCatImage = ({fact}) => {

    const [imgUrl, setImageUrl] = useState('');
    useEffect(() => {
        if (!fact) return
        const firstWords = fact.split(' ', 1).join(' ')
        fetch(`https://cataas.com/cat/says/${firstWords}?size=50&json=true`)
            .then(res => res.json())
            .then(data => {
                const { url } = data
                setImageUrl(url)
            })
    }, [fact])

    return {
        imgUrl
    }
}
import { useEffect, useState } from "react"
import { getCatImg } from "../services/getCatImg"

export const UseCatImg = ({fact}) => {
    const [imgUrl, setImgUrl] = useState()

    const getImgUrl = async(words) => {
        const catImageUrl = await getCatImg(words)
        setImgUrl(catImageUrl)
    }

    useEffect(() => {
            if (!fact) return
            const catWords = fact.split(' ', 4).join(' ')
            getImgUrl(catWords)
        }, [fact])
    
    return {
        imgUrl
    }
}
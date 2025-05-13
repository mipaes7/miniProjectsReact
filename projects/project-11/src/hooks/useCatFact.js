import { useEffect, useState } from "react"
import { getCatFact } from "../services/getCatFact"

export const useCatFact = () => {
    const [fact, setFact] = useState(null)

    const getRandomFact = async() => {
        const newFact = await getCatFact()
        setFact(newFact)
    }
    
    useEffect(() => {
        getRandomFact()
    }, [])

    return {
        fact,
        getRandomFact
    }
}
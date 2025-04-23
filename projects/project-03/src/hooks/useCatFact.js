import { useEffect, useState } from "react"
import { getRandomFact } from "../services/getRandomFact"

export const useCatFact = () => {
    const [fact, setFact] = useState('')
    const getRandomFactAndUpdate = async () => {
        const newFact = await getRandomFact()
        setFact(newFact)
    }

    useEffect(() => {
        getRandomFactAndUpdate()
    }, [])

    return {
        fact,
        getRandomFactAndUpdate
    }
}
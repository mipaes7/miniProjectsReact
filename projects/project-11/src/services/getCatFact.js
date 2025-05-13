export const getCatFact = async () => {
    try {
        const res = await fetch('https://catfact.ninja/fact')
        const data = await res.json()
        console.log(data.fact)
        return data.fact
    } catch (error) {
        console.log(error)
    }
}
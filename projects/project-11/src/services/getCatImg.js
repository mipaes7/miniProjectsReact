export const getCatImg = async(words) => {
    try {
        const res = await fetch(`https://cataas.com/cat/says/${words}?json=true`)
        const data = await res.json()
        const { url } = data
        return url
    } catch (error) {
        console.log(error)        
    }
}
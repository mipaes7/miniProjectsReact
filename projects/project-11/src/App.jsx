import { useEffect, useState } from "react"
import { useCatFact } from "./hooks/useCatFact"
import { UseCatImg } from "./hooks/useCatImg"

export const App = () => {

    const { fact, getRandomFact } = useCatFact()
    const { imgUrl } = UseCatImg({fact})

    return (
        <>
            <h1>Prueba técnica</h1>
            <button onClick={getRandomFact}>New Cat</button>
            {fact && <p>{fact}</p>}
            {imgUrl && <img src={imgUrl} alt="cat" width={'450px'} height={'450px'} />}
        </>
    )
}
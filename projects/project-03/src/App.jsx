import { useCatImage } from './hooks/useCatImage';
import { useCatFact } from './hooks/useCatFact';
import './App.css'

export const App = () => {

  const {fact, getRandomFactAndUpdate} = useCatFact()
  const {imgUrl} = useCatImage({fact})

  const handleClick = async () => {
    getRandomFactAndUpdate()
  }

  return (
    <main>
      <h1>holaMundo.</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imgUrl && <img src={imgUrl} alt='img' />}
    </main>
  )
}

import { useStore } from './hooks/useStore';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'

function App() {

  const { fromLanguage, setFromLanguage } = useStore()

  return (
    <>
      <h1>Google Translate</h1>
      <hr />
      <button onClick={() => {
        setFromLanguage('es')
      }}>To Spanish {fromLanguage}</button>
    </>
  )
}

export default App

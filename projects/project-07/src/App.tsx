import { useStore } from './hooks/useStore'

import { Button, Col, Container, Row, Stack } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { AUTO_LANGUAGE } from './constants'
import { ArrowsIcon } from './components/Icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { TextArea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

function App() {

  const { loading, toLanguage, fromLanguage, setFromLanguage, interchangeLanguages, setToLanguage, fromText, result, setFromText, setResult } = useStore()

  const debouncedFromText = useDebounce(fromText, 300);

  useEffect(() => {
    if (debouncedFromText === '') return

    translate({fromLanguage, toLanguage, text: fromText})
      .then(result => {
        if (result === null) return
        console.log(result)
        setResult(result)
      })
      .catch(() => {setResult('Error')})
  }, [debouncedFromText, fromLanguage, toLanguage])

  return (
    <Container fluid>
      <h1>Google Translate</h1>
      <hr />
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector type={SectionType.From} value={fromLanguage} onChange={setFromLanguage}/>
            <TextArea
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}
            />
          </Stack>
        </Col>
        <Col xs='auto'>
          <Button variant='link' disabled={fromLanguage === AUTO_LANGUAGE} onClick={interchangeLanguages}>
            <ArrowsIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector type={SectionType.To} value={toLanguage} onChange={setToLanguage} />
            <TextArea
              type={SectionType.To}
              value={result}
              onChange={setResult}
              loading={loading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default App

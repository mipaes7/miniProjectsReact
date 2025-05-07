import { Form } from 'react-bootstrap'
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from '../constants'
import { FC } from 'react'
import { SectionType, type FromLanguage, type Language } from '../types.d'

type Props =
    | {type: SectionType.From, value: FromLanguage,  onChange: (language: FromLanguage) => void}
    | {type: SectionType.To, value: Language, onChange: (language: Language) => void}

//establecemos que es un FunctionComponent y parametrizamos los tipos de props
// let nums = [1, 2, 3] ----> nums: Array[numbers] = [1, 2, 3] 

export const LanguageSelector: FC<Props> = ({onChange, type, value}) => {
    // evento tipo React.ChangeEvent y entre <> establecemos el elemento del que procede el evento
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(event.target.value as Language)
    }

    return (
        <Form.Select aria-label='Selecciona el idioma' onChange={handleChange} value={value}>
            {type === SectionType.From && <option value={AUTO_LANGUAGE}>Detectar Idioma</option>}
            {
                Object.entries(SUPPORTED_LANGUAGES).map(([key, literal]) => (
                    <option key={key} value={key}>
                        {literal}
                    </option>
                ))
            }
        </Form.Select>
    )
}
import { useReducer } from 'react'
import { State, Action } from '../types';

const initialState: State = {
  fromLanguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false
}

const reducer = (state: State, action: Action) => {
  const { type } = action

  switch (type) {
    case 'INTERCHANGE_LANGUAGES':
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }
    case 'SET_FROM_LANGUAGE':
      return {
        ...state,
        fromLanguage: action.payload
      }
    case 'SET_TO_LANGUAGE':
      return {
        ...state,
        toLanguage: action.payload
      }
    case 'SET_FROM_TEXT':
      return {
        ...state,
        loading: true,
        fromText: action.payload,
        result: ''
      }
    case 'SET_RESULT':
      return {
        ...state,
        loading: true,
        result: action.payload
      }
  }

  return state

}

export const useStore = () => {
      const [{
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading
      }, dispatch] = useReducer(reducer, initialState)
    
      console.log({fromLanguage})

      const interchangeLanguages = () => dispatch({type: 'INTERCHANGE_LANGUAGES'})

      const setFromLanguage = (payload: string) => {
        dispatch({type: 'SET_FROM_LANGUAGE', payload})
      }
      
      const setToLanguage = (payload: string) => {
        dispatch({type: 'SET_TO_LANGUAGE', payload})
      }
      
      const setFromText = (payload: string) => {
        dispatch({type: 'SET_FROM_TEXT', payload})
      }
      
      const setResult = (payload: string) => {
        dispatch({type: 'SET_RESULT', payload})
      }

      return {
        fromLanguage,
        toLanguage,
        fromText,
        result,
        loading,
        interchangeLanguages,
        setFromText,
        setFromLanguage,
        setToLanguage,
        setResult
      }
}
import { create } from "zustand";
import type { Question } from "../types";
import { persist } from "zustand/middleware";

interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => void;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  reset: () => void;
}

// persist devuelve una función así que necesitamos tiparlo con ()

export const useQuestionsStore = create<State>()(persist((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch('http://localhost:5173/data.json')
      const data = await res.json()

      const questions = data.sort(() => Math.random() - 0.5).slice(0, limit)
      set({questions})
    },
    selectAnswer: (questionId: number, answerIndex : number) => {
        const { questions } = get()
        // structuredclone para clonar el objeto
        const newQuestions = structuredClone(questions)
        // encontramos el índice de la pregunta
        const qIndex = newQuestions.findIndex(q => q.id === questionId)
        // obtenemos la info de la pregunta
        const qInfo = newQuestions[qIndex]
        // comprobamos si ha acertado
        const isUserCorrect = qInfo.correctAnswer === answerIndex
        // mutamos esta info en el clon
        newQuestions[qIndex] = {
            ...qInfo,
            isCorrectUserAnswer: isUserCorrect,
            userSelectedAnswer: answerIndex
        }
        set({questions: newQuestions})
    },
    goNextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({currentQuestion: nextQuestion})
      }
    },
    goPrevQuestion: () => {
      const { currentQuestion } = get()
      const prevQuestion = currentQuestion - 1

      if (prevQuestion >= 0) {
        set({currentQuestion: prevQuestion})
      }
    },
    reset: () => {
      set({currentQuestion: 0, questions: []})
    }
  };
}, {
  name: 'questions',
}))

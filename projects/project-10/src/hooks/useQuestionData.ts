import { useQuestionsStore } from "../store/questions"

export const UseQuestionData = () => {
        const questions = useQuestionsStore(state => state.questions)
    
        let correct = 0
        let incorrect = 0
        let unanswered = 0
    
        questions.forEach(q => {
            const { userSelectedAnswer, correctAnswer } = q
            if (userSelectedAnswer == null) unanswered++
            else if (userSelectedAnswer === correctAnswer) correct++
            else incorrect++
        })

    return {
        correct,
        incorrect,
        unanswered
    }
}
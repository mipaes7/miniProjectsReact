import { useQuestionsStore } from "./store/questions"

export const Footer = () => {

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

    return (
        <footer style={{marginTop: '16px'}}>
            <strong>{`✅${correct}  ❌${incorrect}  ❓${unanswered}`}</strong>
        </footer>
    )
}
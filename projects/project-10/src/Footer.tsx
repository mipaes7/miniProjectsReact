import { Button } from "@mui/material"
import { UseQuestionData } from "./hooks/useQuestionData"
import { useQuestionsStore } from "./store/questions"

export const Footer = () => {

    const { correct, incorrect, unanswered } = UseQuestionData()
    const reset = useQuestionsStore(state => state.reset)

    return (
        <footer style={{marginTop: '16px'}}>
            <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px'}}>
            <strong>{`✅${correct}  ❌${incorrect}  ❓${unanswered}`}</strong>
            <Button onClick={() => reset()}>
                Reset
            </Button>
            </div>
        </footer>
    )
}
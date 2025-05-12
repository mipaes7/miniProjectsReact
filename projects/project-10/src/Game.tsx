import { Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography } from "@mui/material"
import { useQuestionsStore } from "./store/questions"
import type { Question } from "./types"
import SyntaxHighlighter from 'react-syntax-highlighter'
import { atelierEstuaryDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material"
import { Footer } from "./Footer"

const getBGColor = (info: Question, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info

    // ususario no ha seleccionado
    if (userSelectedAnswer == null) return 'transparent'
    // solución incorrecta
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    // solución correcta
    if (index === correctAnswer) return 'green'
    //
    if (index === userSelectedAnswer) return 'red'

    return 'transparent'

}

const Question = ({info}: {info: Question}) => {

    console.log(info.userSelectedAnswer)

    const selectAnswer = useQuestionsStore(state => state.selectAnswer)

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex)
    }

    return (
        <Card variant="outlined" sx={{textAlign: 'left', padding: 4}}>
            <Typography variant="h5">
                {info.question}
            </Typography>

            <SyntaxHighlighter language='javascript' style={atelierEstuaryDark}>
                {info.code}
            </SyntaxHighlighter>

            <List sx={{bgcolor: '#333'}} disablePadding>
                {info.answers.map((answer, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton disabled={info.userSelectedAnswer !== undefined} onClick={createHandleClick(index)} sx={{bgcolor: getBGColor(info, index)}}>
                            <ListItemText primary={answer}  sx={{textAlign: 'center'}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Game = () => {

    const questions = useQuestionsStore(state => state.questions)
    const currentQuestion = useQuestionsStore(state => state.currentQuestion)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPrevQ = useQuestionsStore(state => state.goPrevQuestion)

    const questionInfo = questions[currentQuestion]

    return (
        <>
            <Stack direction={'row'} gap={2} alignItems={'center'} justifyContent={'center'}>
                <IconButton onClick={goPrevQ} disabled={currentQuestion === 0}>
                    <ArrowBackIos />
                </IconButton>
                {`${currentQuestion + 1} / ${questions.length}`}
                <IconButton onClick={goNextQuestion} disabled={currentQuestion === questions.length - 1}>
                    <ArrowForwardIos />
                </IconButton>
            </Stack>
            <Question info={questionInfo} />
            <Footer />
        </>
    )
}
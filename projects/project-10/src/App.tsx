import { Container, Stack, Typography } from "@mui/material";
import "./App.css";
import { JSLogo } from "./JSLogo";
import { StartPage } from "./StartPage";
import { useQuestionsStore } from "./store/questions";
import { Game } from "./Game";

function App() {

  const questions = useQuestionsStore(state => state.questions)

  console.log(questions)

  return (
    <main>
      <Container>
        <Stack
          direction="row"
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Typography variant="h2" component="h1">
            JSQuiz <JSLogo />
          </Typography>
        </Stack>
        {questions.length === 0 && <StartPage />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  );
}

export default App;

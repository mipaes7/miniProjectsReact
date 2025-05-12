import { Button } from "@mui/material";
import { useQuestionsStore } from "./store/questions";

export const StartPage = () => {

  const fetchQuestions = useQuestionsStore(state => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(5)
  }

  return (
    <Button onClick={handleClick} variant="contained">
      Start!
    </Button>
  );
};

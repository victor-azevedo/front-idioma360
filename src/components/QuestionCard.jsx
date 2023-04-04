import { Card, CardContent, Stack, Typography } from "@mui/material";
import QuestionItem from "./QuestionItem";

export default function QuestionCard({
  id,
  title,
  optionA,
  optionB,
  optionC,
  optionD,
  questionsAnswers,
  setQuestionsAnswers,
}) {
  return (
    <Card sx={{ m: 3 }} variant="outlined">
      <CardContent>
        <Stack spacing={1}>
          <Typography variant="h5" marginBottom={1}>
            {title}
          </Typography>
          <QuestionItem
            option={"optionA"}
            text={optionA}
            questionId={id}
            questionsAnswers={questionsAnswers}
            setQuestionsAnswers={setQuestionsAnswers}
          />
          <QuestionItem
            option={"optionB"}
            text={optionB}
            questionId={id}
            questionsAnswers={questionsAnswers}
            setQuestionsAnswers={setQuestionsAnswers}
          />
          <QuestionItem
            option={"optionC"}
            text={optionC}
            questionId={id}
            questionsAnswers={questionsAnswers}
            setQuestionsAnswers={setQuestionsAnswers}
          />
          <QuestionItem
            option={"optionD"}
            text={optionD}
            questionId={id}
            questionsAnswers={questionsAnswers}
            setQuestionsAnswers={setQuestionsAnswers}
          />
        </Stack>
      </CardContent>
    </Card>
  );
}

import { Box, Typography } from "@mui/material";

export default function QuestionItem({
  questionId,
  option,
  text,
  questionsAnswers,
  setQuestionsAnswers,
}) {
  const isSelected = questionsAnswers[questionId] === option;

  function handleOption() {
    setQuestionsAnswers({ ...questionsAnswers, [questionId]: option });
  }

  return (
    <Box
      onClick={handleOption}
      bgcolor={isSelected ? "lightcoral" : "lightgray"}
    >
      <Typography variant="body1" marginBottom={1}>
        {text}
      </Typography>
    </Box>
  );
}

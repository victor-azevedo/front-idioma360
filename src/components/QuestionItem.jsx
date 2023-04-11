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
      sx={{
        borderRadius: 2,
        p: 2,
        border: 3,
        borderColor: isSelected ? "primary.main" : "primary.lightest",
      }}
      bgcolor={isSelected ? "primary.dark" : "primary.light"}
      color={isSelected ? "neutral.50" : "text.primary"}
      fontWeight="700"
    >
      <Typography variant="body1">{text}</Typography>
    </Box>
  );
}

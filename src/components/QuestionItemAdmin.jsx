import { Box, Typography } from "@mui/material";

export default function QuestionItemAdmin({ text, isCorrect }) {
  return (
    <Box
      sx={{
        borderRadius: 2,
        p: 2,
        border: 3,
        borderColor: isCorrect ? "primary.main" : "primary.lightest",
      }}
      bgcolor={isCorrect ? "primary.dark" : "primary.light"}
      color={isCorrect ? "neutral.50" : "text.primary"}
      fontWeight="700"
    >
      <Typography variant="body1">{text}</Typography>
    </Box>
  );
}

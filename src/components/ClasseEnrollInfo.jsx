import { Box, Typography } from "@mui/material";
import ClasseCardInfo from "./ClasseCardInfo";

export default function ClasseEnrollInfo({
  name,
  days,
  startTime,
  endTime,
  startDate,
  endDate,
  vacancies,
}) {
  if (!days) {
    return;
  }
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Confirme informações da turma que deseja se inscrever:
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <ClasseCardInfo
          name={name}
          days={days}
          startTime={startTime}
          endTime={endTime}
          startDate={startDate}
          endDate={endDate}
          vacancies={vacancies}
        />
      </Box>
    </Box>
  );
}

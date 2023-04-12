import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import { Box, Typography } from "@mui/material";
import {
  getDayFromISOdate,
  getTimeFromISOdate,
  weekDaysToPtBR,
} from "../helpers";

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
      <Typography variant="body1" marginBottom={1}>
        {name}
      </Typography>
      <Typography variant="body1" marginBottom={1}>
        {`Vagas: ${vacancies}`}
      </Typography>
      <Typography variant="body1" gutterBottom>
        {weekDaysToPtBR(days)}
      </Typography>
      <Typography variant="body1" gutterBottom>
        Período:
      </Typography>
      <Box sx={{ display: "inline-flex", color: "text.secondary" }}>
        <TodayRoundedIcon />
        <Typography variant="body1" marginLeft={1} gutterBottom>
          {` ${getDayFromISOdate(startDate)} à ${getDayFromISOdate(endDate)}`}
        </Typography>
      </Box>
      <Typography variant="body1" gutterBottom>
        Horário:
      </Typography>
      <Box sx={{ display: "inline-flex", color: "text.secondary" }}>
        <AccessTimeRoundedIcon />
        <Typography variant="body1" marginLeft={1} gutterBottom>
          {` ${getTimeFromISOdate(startTime)} às ${getTimeFromISOdate(
            endTime
          )}`}
        </Typography>
      </Box>
    </Box>
  );
}

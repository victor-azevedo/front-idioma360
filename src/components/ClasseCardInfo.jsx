import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  getDayFromISOdate,
  getTimeFromISOdate,
  weekDaysToPtBR,
} from "../helpers";

export default function ClasseCardInfo({
  name,
  days,
  startTime,
  endTime,
  startDate,
  endDate,
  vacancies,
  courseName,
}) {
  return (
    <Card sx={{ m: 3, width: 300 }} variant="outlined">
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h5" marginBottom={1}>
          {name}
        </Typography>
        {courseName && (
          <Typography variant="h6" marginBottom={1}>
            {`Curso: ${courseName}`}
          </Typography>
        )}
        <Typography variant="body1" marginBottom={1}>
          {`Vagas: ${vacancies}`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {weekDaysToPtBR(days)}
        </Typography>
        <Typography variant="body1" textAlign="center" gutterBottom>
          Período:
        </Typography>
        <Box sx={{ display: "inline-flex", color: "text.secondary" }}>
          <TodayRoundedIcon />
          <Typography variant="body1" marginLeft={1} gutterBottom>
            {` ${getDayFromISOdate(startDate)} à ${getDayFromISOdate(endDate)}`}
          </Typography>
        </Box>
        <Typography variant="body1" textAlign="center" gutterBottom>
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
      </CardContent>
    </Card>
  );
}

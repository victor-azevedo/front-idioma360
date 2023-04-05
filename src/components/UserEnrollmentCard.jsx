import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import { Box, Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/router";
import {
  getDayFromISOdate,
  getTimeFromISOdate,
  isToday,
  weekDaysToPtBR,
} from "../helpers";

export default function UserEnrollmentCard({
  name,
  days,
  startTime,
  endTime,
  startDate,
  endDate,
  vacancies,
  testId,
  offering,
}) {
  const router = useRouter();

  function handleForwardTest() {
    router.push(`/tests/${testId}`);
  }

  return (
    <Card sx={{ m: 3, width: 300 }} variant="outlined">
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h5" marginBottom={1}>
          {name}
        </Typography>
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
        <Typography variant="body1" textAlign="center" gutterBottom>
          Dia da Prova:
        </Typography>
        <Box sx={{ display: "inline-flex", color: "text.secondary" }}>
          <TodayRoundedIcon />
          <Typography variant="body1" marginLeft={1} gutterBottom>
            {getDayFromISOdate(offering.testDate)}
          </Typography>
        </Box>
        <Button
          fullWidth
          size="large"
          sx={{ mt: 3 }}
          type="submit"
          variant="contained"
          onClick={handleForwardTest}
          disabled={!isToday(offering.testDate)}
        >
          Acessar Prova
        </Button>
      </CardContent>
    </Card>
  );
}

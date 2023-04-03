import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import TodayRoundedIcon from "@mui/icons-material/TodayRounded";
import { Box, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { weekDaysToPtBR } from "../helpers";

export default function ClasseCard({
  id,
  name,
  days,
  startTime,
  endTime,
  startDate,
  endDate,
  vacancies,
}) {
  const router = useRouter();
  function handleClasseCardClick() {
    router.push(`/app/classes/${id}`);
  }

  return (
    <Card
      sx={{ m: 3, width: 300 }}
      variant="outlined"
      onClick={() => handleClasseCardClick()}
    >
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
            {` ${dayjs(startDate).format("DD/MM/YYYY")} à ${dayjs(
              endDate
            ).format("DD/MM/YYYY")}`}
          </Typography>
        </Box>
        <Typography variant="body1" textAlign="center" gutterBottom>
          Horário:
        </Typography>
        <Box sx={{ display: "inline-flex", color: "text.secondary" }}>
          <AccessTimeRoundedIcon />
          <Typography variant="body1" marginLeft={1} gutterBottom>
            {` ${dayjs(startTime).format("HH[h]mm[min]")} às ${dayjs(
              endTime
            ).format("HH[h]mm[min]")}`}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}

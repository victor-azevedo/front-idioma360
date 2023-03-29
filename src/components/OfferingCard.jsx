import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/router";
import { getDayFromISOdate, getTimeFromISOdate } from "../helpers/date-helper";

export default function OfferingCard({
  startDate,
  endDate,
  testDate,
  testStartTime,
  testEndTime,
  resultDate,
  classe,
  classeId,
}) {
  const router = useRouter();

  return (
    <Card sx={{ m: 3, minWidth: 275 }} variant="elevation">
      <CardContent>
        <Typography variant="h4">Curso: {classe.course.name}</Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Inscrições: {getDayFromISOdate(startDate)} a{" "}
          {getDayFromISOdate(endDate)}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Prova: {getDayFromISOdate(testDate)} das{" "}
          {getTimeFromISOdate(testStartTime)} às{" "}
          {getTimeFromISOdate(testEndTime)}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Resultado: {getDayFromISOdate(resultDate)}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => router.push(`/classe/${classeId}`)}>
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
}

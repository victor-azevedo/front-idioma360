import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

export default function CourseCard({ name, creditHours, description }) {
  return (
    <Card sx={{ m: 3, minWidth: 275 }} variant="elevation">
      <CardContent>
        <Typography variant="h5" marginBottom={1}>
          Curso: {name}
        </Typography>
        <Typography fontSize={14} color="text.primary" gutterBottom>
          Descrição: {description}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Carga Horária: {creditHours}
        </Typography>
      </CardContent>
    </Card>
  );
}

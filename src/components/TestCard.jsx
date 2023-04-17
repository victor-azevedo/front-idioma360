import { Avatar, Card, CardActions, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import AdminEditDeleteBox from "./AdminEditDeleteBox";

export default function TestCard({ id, name, course, _count }) {
  return (
    <Card sx={{ m: 3, width: 300 }} variant="outlined">
      <CardContent
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        <Typography variant="h5" marginBottom={1}>
          {name}
        </Typography>
        <Typography variant="h6" marginBottom={1}>
          {course.name}
        </Typography>
        <Avatar src={course.imageUrl} alt="bandeira" />
        <Typography variant="body1" margin={1}>
          {`Número de Questões: ${_count.questions}`}
        </Typography>
        <CardActions
          sx={{
            w: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AdminEditDeleteBox
            onlyEdit
            redirectEditRoute={`/app/admin/tests/${id}/edit`}
          />
        </CardActions>
      </CardContent>
    </Card>
  );
}

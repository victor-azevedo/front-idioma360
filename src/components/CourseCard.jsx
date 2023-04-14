import { Avatar, Box, Button, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import { useRouter } from "next/router";
import CardStyled from "./CardStyled";

export default function CourseCard({
  id,
  name,
  creditHours,
  description,
  imageUrl,
  admin,
}) {
  const router = useRouter();

  return (
    <CardStyled>
      <CardContent>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            marginBottom: "1",
          }}
        >
          <Avatar src={imageUrl} alt="bandeira"></Avatar>
          <Typography variant="h5" marginX={1}>
            {name}
          </Typography>
        </Box>
        <Typography fontSize={16} color="text.primary" gutterBottom>
          {description}
        </Typography>
        <Typography sx={{ fontSize: 16 }} color="InfoText" gutterBottom>
          Carga Horária: {creditHours}
        </Typography>
        {admin && (
          <Button
            size="large"
            onClick={() => router.push(`/app/admin/courses/${id}/edit`)}
          >
            Editar
          </Button>
        )}
      </CardContent>
    </CardStyled>
  );
}

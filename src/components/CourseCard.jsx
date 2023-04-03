import { Avatar, Box, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import CardStyled from "./CardStyled";

export default function CourseCard({
  name,
  creditHours,
  description,
  imageUrl,
}) {
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
      </CardContent>
    </CardStyled>
  );
}

import { Avatar, Box, Grid, Typography } from "@mui/material";
import CardContent from "@mui/material/CardContent";

import CardStyled from "./CardStyled";
import ClasseCard from "./ClasseCard";

export default function CourseClassesCard({ name, imageUrl, classes }) {
  return (
    <CardStyled>
      <CardContent>
        <Box
          sx={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 3,
            width: "100%",
          }}
        >
          <Avatar src={imageUrl} alt="bandeira"></Avatar>
          <Typography variant="h5" marginX={1}>
            {name}
          </Typography>
        </Box>
        <Grid container spacing={3}>
          {classes.map((classe) => {
            return <ClasseCard key={classe.id} {...classe}></ClasseCard>;
          })}
        </Grid>
      </CardContent>
    </CardStyled>
  );
}

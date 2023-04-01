import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import Head from "next/head";

import ClasseCard from "@/src/components/ClasseCard";
import useGetClasses from "@/src/hooks/api/useGetClasses";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const { classes, getClassesLoading } = useGetClasses();

  if (getClassesLoading) {
    return <>Loading</>;
  }
  return (
    <>
      <Head>
        <title>Turmas | Idioma 360</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4" marginLeft={3}>
              Turmas disponíveis
            </Typography>
            <Grid container spacing={3}>
              {classes.map((course) => {
                return <ClasseCard key={course.id} {...course}></ClasseCard>;
              })}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";

import CourseCard from "@/src/components/CourseCard";
import useGetCourses from "@/src/hooks/api/useGetCourses";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const { courses, getCoursesLoading } = useGetCourses();

  if (getCoursesLoading) {
    return <>Loading</>;
  }
  return (
    <>
      <Head>
        <title>Cursos | Idioma 360</title>
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
              Nossos Cursos
            </Typography>
            <Grid container spacing={3}>
              {courses.map((course) => {
                return <CourseCard key={course.id} {...course}></CourseCard>;
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

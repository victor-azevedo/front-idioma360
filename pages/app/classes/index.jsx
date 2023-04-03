import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";

import CourseClassesCard from "@/src/components/CouseClassesCard";
import useGetCoursesClasses from "@/src/hooks/api/useGetCoursesClasses";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const { coursesClasses, getCoursesClassesLoading } =
    useGetCoursesClasses("open");

  if (getCoursesClassesLoading) {
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
            {coursesClasses.map((course) => (
              <CourseClassesCard key={course.id} {...course} />
            ))}
          </Stack>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

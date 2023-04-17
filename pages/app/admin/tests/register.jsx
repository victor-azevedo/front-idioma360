import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";

import TestForm from "@/src/components/forms/TestForm";
import useGetCourses from "@/src/hooks/api/useGetCourses";
import { LayoutAdmin as DashboardLayout } from "@/src/layouts/dashboard/layout-admin";
import { initialValuesTestForm } from "@/src/mock/forms-mock";
import { useRouter } from "next/router";

const Page = () => {
  const router = useRouter();

  const { courses, getCoursesLoading, getCoursesError } = useGetCourses();

  if (!courses || getCoursesLoading) {
    return <>Loading</>;
  }

  if (getCoursesError) {
    router.push("/app/admin/tests");
  }

  if (courses.length <= 0) {
    router.push("/app/admin/courses");
  }

  return (
    <>
      <Head>
        <title>Provas | Idioma 360</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="xl">
          <Stack spacing={6}>
            <Stack spacing={3}>
              <Typography variant="h3" marginLeft={3}>
                Cadastrar nova Prova
              </Typography>
              <TestForm
                {...initialValuesTestForm}
                courses={courses}
                type="create"
              />
            </Stack>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
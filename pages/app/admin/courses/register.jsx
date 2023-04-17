import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";

import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

import CourseForm from "@/src/components/forms/CourseForm";
import ContainerEaseIn from "@/src/components/ContainerEaseIn";

const Page = () => {
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
        <ContainerEaseIn>
          <Stack spacing={3}>
            <Typography variant="h4" marginLeft={3}>
              Cadastrar novo Curso
            </Typography>
            <CourseForm />
          </Stack>
        </ContainerEaseIn>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

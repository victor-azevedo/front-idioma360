import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";

import CourseSection from "@/src/components/sections/CourseSection";
import { useRouter } from "next/router";
import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

const Page = () => {
  const router = useRouter();

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
              Gerenciar Cursos
            </Typography>
            <CourseSection admin={true} />
          </Stack>
          <Button
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
            onClick={() => router.push("/app/admin/courses/register")}
          >
            Cadastrar Curso
          </Button>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

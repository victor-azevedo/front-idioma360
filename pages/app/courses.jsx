import { Box, Stack, Typography } from "@mui/material";
import Head from "next/head";

import ContainerEaseIn from "@/src/components/ContainerEaseIn";
import CourseSection from "@/src/components/sections/CourseSection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

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
              Nossos Cursos
            </Typography>
            <CourseSection />
          </Stack>
        </ContainerEaseIn>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

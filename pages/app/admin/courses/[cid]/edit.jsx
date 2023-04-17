import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";

import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

import LoadingDots from "@/src/components/LoadingDots";
import CourseForm from "@/src/components/forms/CourseForm";
import handleResponseError from "@/src/errors/handleResponseError";
import useGetCourseById from "@/src/hooks/api/useGetCourseById";
import { useRouter } from "next/router";
import { useEffect } from "react";
import ContainerEaseIn from "@/src/components/ContainerEaseIn";

const Page = () => {
  const router = useRouter();
  const {
    courseData,
    getCourseById,
    getCourseByIdLoading,
    getCourseByIdError,
  } = useGetCourseById();

  useEffect(() => {
    async function getCourseData() {
      if (router.isReady) {
        try {
          await getCourseById(router.query.cid);
        } catch (error) {
          handleResponseError(error);
        }
        return;
      }
    }
    getCourseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (getCourseByIdLoading) {
    return <LoadingDots />;
  }

  if (getCourseByIdError) {
    router.push("/app/admin/courses");
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
        <ContainerEaseIn>
          <Stack spacing={3}>
            <Typography variant="h4" marginLeft={3}>
              Editar Curso
            </Typography>
            <CourseForm {...courseData} />
          </Stack>
        </ContainerEaseIn>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

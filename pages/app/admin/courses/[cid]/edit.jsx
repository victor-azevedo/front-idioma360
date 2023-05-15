import { Stack, Typography } from "@mui/material";

import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

import LoadingDots from "@/src/components/LoadingDots";
import CourseForm from "@/src/components/forms/CourseForm";
import handleResponseError from "@/src/errors/handleResponseError";
import useGetCourseById from "@/src/hooks/api/useGetCourseById";
import { useRouter } from "next/router";
import { useEffect } from "react";

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
    <Stack spacing={3}>
      <Typography variant="h4" marginLeft={3}>
        Editar Curso
      </Typography>
      <CourseForm {...courseData} />
    </Stack>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Editar Curso">{page}</DashboardLayout>
);

export default Page;

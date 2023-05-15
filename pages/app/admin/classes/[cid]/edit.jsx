import { Stack, Typography } from "@mui/material";

import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

import LoadingDots from "@/src/components/LoadingDots";
import ClasseForm from "@/src/components/forms/ClasseForm";
import handleResponseError from "@/src/errors/handleResponseError";
import useGetClasseById from "@/src/hooks/api/useGetClasseById";
import useGetCourses from "@/src/hooks/api/useGetCourses";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Page = () => {
  const router = useRouter();

  const { classe, getClasseById, getClasseByIdLoading, getClasseByIdError } =
    useGetClasseById();

  const { courses, getCoursesLoading, getCoursesError } = useGetCourses();

  useEffect(() => {
    async function getClasseData() {
      if (router.isReady) {
        try {
          await getClasseById(router.query.cid);
        } catch (error) {
          handleResponseError(error);
        }
        return;
      }
    }
    getClasseData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  if (getClasseByIdLoading || getCoursesLoading) {
    return <LoadingDots />;
  }

  if (getClasseByIdError || getCoursesError) {
    router.push("/app/admin/classes");
  }

  if (!classe || courses.length <= 0) {
    return <LoadingDots />;
  }

  return (
    <Stack spacing={3}>
      <Typography variant="h4" marginLeft={3}>
        Editar Turma
      </Typography>
      <ClasseForm {...classe} courses={courses} />
    </Stack>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Editar Turma">{page}</DashboardLayout>
);

export default Page;

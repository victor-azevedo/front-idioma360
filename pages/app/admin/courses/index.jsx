import { Box, Button, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";

import CourseSection from "@/src/components/sections/CourseSection";
import handleResponseError from "@/src/errors/handleResponseError";
import useDeleteCourse from "@/src/hooks/api/useDeleteCourse";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";
import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

const Page = () => {
  const router = useRouter();
  const { deleteCourse } = useDeleteCourse();

  const [deleteCourseId, setDeleteCourseId] = useState(0);

  const handleDeleteCourse = useCallback(async () => {
    try {
      await deleteCourse(deleteCourseId);
      toast.success("Curso excluído com sucesso");
    } catch (err) {
      handleResponseError(err);
    } finally {
      router.reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteCourseId]);

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
            <CourseSection
              admin={true}
              setDeleteCourseId={setDeleteCourseId}
              handleDeleteCourse={handleDeleteCourse}
            />
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

import { Button, Stack, Typography } from "@mui/material";

import CourseSection from "@/src/components/sections/CourseSection";
import { useRouter } from "next/router";
import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

const Page = () => {
  const router = useRouter();

  return (
    <Stack spacing={3}>
      <Typography variant="h4" marginLeft={3}>
        Gerenciar Cursos
      </Typography>
      <CourseSection admin={true} />
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={() => router.push("/app/admin/courses/register")}
      >
        Cadastrar Curso
      </Button>
    </Stack>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout pageTitle={"Gerenciar Cursos"}>{page}</DashboardLayout>
);

export default Page;

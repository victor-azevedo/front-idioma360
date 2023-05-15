import { Stack, Typography } from "@mui/material";

import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

import CourseForm from "@/src/components/forms/CourseForm";

const Page = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" marginLeft={3}>
        Cadastrar novo Curso
      </Typography>
      <CourseForm />
    </Stack>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Cadastrar Curso">{page}</DashboardLayout>
);

export default Page;

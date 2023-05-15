import { Stack, Typography } from "@mui/material";

import CourseSection from "@/src/components/sections/CourseSection";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" marginLeft={3}>
        Nossos Cursos
      </Typography>
      <CourseSection />
    </Stack>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Cursos">{page}</DashboardLayout>
);

export default Page;

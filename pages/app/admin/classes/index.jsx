import ClasseSection from "@/src/components/sections/ClasseSection";
import { Stack, Typography } from "@mui/material";

import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";
const Page = () => {
  return (
    <Stack spacing={3}>
      <Typography variant="h4" marginLeft={3}>
        Gerenciar Seleções
      </Typography>
      <ClasseSection admin />
    </Stack>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Gerenciar Turmas">{page}</DashboardLayout>
);

export default Page;

import { Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

import TestSection from "@/src/components/sections/TestSection";
import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

const Page = () => {
  const router = useRouter();

  return (
    <Stack spacing={3}>
      <Typography variant="h4" marginLeft={3}>
        Gerenciar Provas
      </Typography>
      <TestSection admin={true} />
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={() => router.push("/app/admin/tests/register")}
      >
        Cadastrar Prova
      </Button>
    </Stack>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Gerenciar Provas">{page}</DashboardLayout>
);

export default Page;

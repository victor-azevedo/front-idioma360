import { Button, Stack, Typography } from "@mui/material";

import OfferSection from "@/src/components/sections/OfferSection";
import { useRouter } from "next/router";
import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

const Page = () => {
  const router = useRouter();

  return (
    <Stack spacing={3}>
      <Typography variant="h4" marginLeft={3}>
        Gerenciar Seleções
      </Typography>
      <OfferSection admin={true} />
      <Button
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        onClick={() => router.push("/app/admin/offerings/register")}
      >
        Cadastrar Seleção
      </Button>
    </Stack>
  );
};
Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Gerenciar Seleções">{page}</DashboardLayout>
);

export default Page;

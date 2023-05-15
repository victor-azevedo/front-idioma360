import { Stack, Typography } from "@mui/material";

import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

import OfferingForm from "@/src/components/forms/OfferingForm";
import { initialValuesOfferForm } from "@/src/mock/forms-mock";

const Page = () => {
  return (
    <Stack spacing={6}>
      <Stack spacing={3}>
        <Typography variant="h3" marginLeft={3}>
          Cadastrar nova Seleção
        </Typography>
        <OfferingForm {...initialValuesOfferForm} type="create" />
      </Stack>
    </Stack>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout pageTitle="Cadastrar Seleção">{page}</DashboardLayout>
);

export default Page;

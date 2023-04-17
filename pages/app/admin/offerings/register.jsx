import { Box, Stack, Typography } from "@mui/material";
import Head from "next/head";

import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

import ContainerEaseIn from "@/src/components/ContainerEaseIn";
import OfferingForm from "@/src/components/forms/OfferingForm";
import { initialValuesOfferForm } from "@/src/mock/forms-mock";

const Page = () => {
  return (
    <>
      <Head>
        <title>Seleções | Idioma 360</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <ContainerEaseIn>
          <Stack spacing={6}>
            <Stack spacing={3}>
              <Typography variant="h3" marginLeft={3}>
                Cadastrar nova Seleção
              </Typography>
              <OfferingForm {...initialValuesOfferForm} type="create" />
            </Stack>
          </Stack>
        </ContainerEaseIn>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

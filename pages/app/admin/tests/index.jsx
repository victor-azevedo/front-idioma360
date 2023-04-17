import { Box, Button, Stack, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";

import ContainerEaseIn from "@/src/components/ContainerEaseIn";
import TestSection from "@/src/components/sections/TestSection";
import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

const Page = () => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Provas | Idioma 360</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <ContainerEaseIn>
          <Stack spacing={3}>
            <Typography variant="h4" marginLeft={3}>
              Gerenciar Provas
            </Typography>
            <TestSection admin={true} />
          </Stack>
          <Button
            fullWidth
            size="large"
            sx={{ mt: 3 }}
            type="submit"
            variant="contained"
            onClick={() => router.push("/app/admin/tests/register")}
          >
            Cadastrar Prova
          </Button>
        </ContainerEaseIn>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

import { Box, Container, Stack, Typography } from "@mui/material";
import Head from "next/head";

import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

import ClasseForm from "@/src/components/forms/ClasseForm";
import OfferingForm from "@/src/components/forms/OfferingForm";
import { courses } from "@/src/mock/courses";
import { useState } from "react";

const Page = () => {
  const [newOfferingId, setNewOfferingId] = useState(0);

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
        <Container maxWidth="xl">
          <Stack spacing={3}>
            <Typography variant="h4" marginLeft={3}>
              Cadastrar nova Seleção
            </Typography>

            <OfferingForm setNewOfferingId={setNewOfferingId} />
            {newOfferingId ? (
              <>
                <Typography variant="h5">Inserir Turmas</Typography>
                <ClasseForm courses={courses} offeringId={newOfferingId} />
              </>
            ) : (
              ""
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

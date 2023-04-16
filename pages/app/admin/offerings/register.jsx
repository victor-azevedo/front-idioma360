import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";

import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

import ClasseCard from "@/src/components/ClasseCard";
import ClasseForm from "@/src/components/forms/ClasseForm";
import OfferingForm from "@/src/components/forms/OfferingForm";
import {
  courses,
  initialValuesClasseForm,
  initialValuesOfferForm,
} from "@/src/mock/forms-mock";
import { useState } from "react";

const Page = () => {
  const [newOfferingId, setNewOfferingId] = useState(0);

  const [openClasseForm, setOpenClasseForm] = useState(false);

  const [offerClasses, setOfferClasses] = useState([]);

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

            <OfferingForm
              setNewOfferingId={setNewOfferingId}
              {...initialValuesOfferForm}
              id={newOfferingId}
              disabled={newOfferingId ? true : false}
            />
            {offerClasses.length > 0 && (
              <>
                <Typography variant="h5" marginLeft={3}>
                  Turmas Cadastradas
                </Typography>
                <Grid container spacing={3}>
                  {offerClasses.map((classe) => {
                    return (
                      <ClasseCard key={classe.id} {...classe}></ClasseCard>
                    );
                  })}
                </Grid>
              </>
            )}
            {openClasseForm && (
              <>
                <Typography variant="h5">Inserir Turmas</Typography>
                <ClasseForm
                  courses={courses}
                  offeringId={newOfferingId}
                  setOpenClasseForm={setOpenClasseForm}
                  setOfferClasses={setOfferClasses}
                  offerClasses={offerClasses}
                  {...initialValuesClasseForm}
                />
              </>
            )}
            {newOfferingId ? (
              <Button
                size="large"
                sx={{ mt: 3 }}
                type="submit"
                variant="contained"
                onClick={() => setOpenClasseForm(true)}
                disabled={openClasseForm}
              >
                Inserir Turma
              </Button>
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

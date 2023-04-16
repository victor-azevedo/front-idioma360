import { Box, Button, Container, Grid, Stack, Typography } from "@mui/material";
import Head from "next/head";

import { LayoutAdmin as DashboardLayout } from "src/layouts/dashboard/layout-admin";

import ClasseCard from "@/src/components/ClasseCard";
import ClasseForm from "@/src/components/forms/ClasseForm";
import OfferingForm from "@/src/components/forms/OfferingForm";
import { courses, initialValuesClasseForm } from "@/src/mock/forms-mock";
import { useRouter } from "next/router";

import handleResponseError from "@/src/errors/handleResponseError";
import useGetOfferingById from "@/src/hooks/api/useGetOfferingById";
import { useEffect, useState } from "react";

const Page = () => {
  const router = useRouter();

  const {
    offeringData,
    getOfferingById,
    getOfferingByIdLoading,
    getOfferingByIdError,
  } = useGetOfferingById();

  const [openClasseForm, setOpenClasseForm] = useState(false);

  const [offerClasses, setOfferClasses] = useState([]);

  useEffect(() => {
    async function getOfferingData() {
      if (router.isReady) {
        try {
          await getOfferingById(router.query.cid);
        } catch (error) {
          handleResponseError(error);
        }
        return;
      }
    }
    getOfferingData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

  useEffect(() => {
    if (offeringData) {
      setOfferClasses([...offeringData.classes]);
    }
  }, [offeringData]);

  if (!offeringData) {
    return <>Loading</>;
  }

  if (getOfferingByIdLoading) {
    return <>Loading</>;
  }

  if (getOfferingByIdError) {
    router.push("/app/admin/offerings");
  }

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
          <Stack spacing={6}>
            <Stack spacing={3}>
              <Typography variant="h3" marginLeft={3}>
                Editar Seleção
              </Typography>
              <OfferingForm
                {...offeringData}
                disabled={offeringData.id ? true : false}
              />
            </Stack>
            <Stack spacing={3}>
              <Typography variant="h5" marginLeft={3}>
                Turmas Cadastradas:
              </Typography>
              {offerClasses.length > 0 ? (
                <Grid container spacing={3}>
                  {offerClasses.map((classe) => {
                    return (
                      <ClasseCard
                        key={classe.id}
                        {...classe}
                        disabledOnclick={true}
                        admin={true}
                      ></ClasseCard>
                    );
                  })}
                </Grid>
              ) : (
                <Box marginLeft={3}>
                  <Typography variant="body1" marginLeft={3}>
                    Nenhuma turma cadastrada ainda.
                  </Typography>
                </Box>
              )}
            </Stack>
            {openClasseForm && (
              <Stack spacing={3}>
                <ClasseForm
                  courses={courses}
                  offeringId={offeringData.id}
                  setOpenClasseForm={setOpenClasseForm}
                  setOfferClasses={setOfferClasses}
                  offerClasses={offerClasses}
                  getOfferingById={getOfferingById}
                  {...initialValuesClasseForm}
                />
              </Stack>
            )}
            {offeringData.id && !openClasseForm ? (
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  variant="contained"
                  onClick={() => setOpenClasseForm(true)}
                  disabled={openClasseForm}
                >
                  Inserir Turma
                </Button>
              </Box>
            ) : (
              ""
            )}
            {offerClasses.length > 0 && (
              <Button
                variant="contained"
                onClick={() => router.push("/app/admin/offerings")}
                disabled={openClasseForm}
              >
                Concluir Edição
              </Button>
            )}
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

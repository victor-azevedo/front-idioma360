import OfferingCard from "@/src/components/OfferingCard";
import useGetOfferings from "@/src/hooks/api/useGetOfferings";
import {
  Box,
  Container,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";

const Page = () => {
  const { offerings, getOfferingsLoading } = useGetOfferings();

  if (getOfferingsLoading) {
    return <>Loading</>;
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
          <Stack spacing={3}>
            <Typography variant="h4" marginLeft={3}>
              Seleções em aberto
            </Typography>
            <Grid container spacing={3}>
              {offerings.map((offering) => {
                return (
                  <OfferingCard key={offering.id} {...offering}></OfferingCard>
                );
              })}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

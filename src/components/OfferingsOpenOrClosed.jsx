import OfferingCard from "@/src/components/OfferingCard";
import useGetOfferings from "@/src/hooks/api/useGetOfferings";
import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
  Stack,
  Typography,
} from "@mui/material";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import LoadingDots from "./LoadingDots";

const OfferingsOpenOrClosed = ({ status }) => {
  const { offerings, getOfferingsLoading, getOfferingsError } = useGetOfferings(
    {
      status,
    }
  );

  if (getOfferingsLoading) {
    return <LoadingDots />;
  }

  if (getOfferingsError) {
    return <>Error</>;
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
              Seleções {status === "open" ? "em aberto" : "encerradas"}
            </Typography>
            <Grid container spacing={3}>
              {offerings.map((offering) => {
                return (
                  <OfferingCard
                    key={offering.id}
                    {...offering}
                    status={status}
                  ></OfferingCard>
                );
              })}
            </Grid>
          </Stack>
        </Container>
      </Box>
    </>
  );
};
OfferingsOpenOrClosed.getLayout = (page) => (
  <DashboardLayout>{page}</DashboardLayout>
);

export default OfferingsOpenOrClosed;

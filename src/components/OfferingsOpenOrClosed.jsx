import OfferingCard from "@/src/components/OfferingCard";
import useGetOfferings from "@/src/hooks/api/useGetOfferings";
import { Unstable_Grid2 as Grid, Stack, Typography } from "@mui/material";
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
  );
};

export default OfferingsOpenOrClosed;

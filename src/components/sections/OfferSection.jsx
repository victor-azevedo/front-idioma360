import useGetOfferings from "@/src/hooks/api/useGetOfferings";
import { Grid } from "@mui/material";

import LoadingDots from "../LoadingDots";
import OfferingCard from "../OfferingCard";

const OfferSection = (props) => {
  const { offerings, getOfferingsLoading, getOfferingsError } = useGetOfferings(
    { status: null }
  );

  if (getOfferingsLoading) {
    return <LoadingDots />;
  }

  if (getOfferingsError) {
    return <>Error</>;
  }

  return (
    <Grid container spacing={3}>
      {offerings.map((offer) => {
        return <OfferingCard key={offer.id} {...offer} {...props} />;
      })}
    </Grid>
  );
};

export default OfferSection;

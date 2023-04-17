import LoadingDots from "@/src/components/LoadingDots";
import OfferingCard from "@/src/components/OfferingCard";
import useGetOfferings from "@/src/hooks/api/useGetOfferings";

export default function Offerings() {
  const { offerings, getOfferingsLoading, getOfferingsError } =
    useGetOfferings();

  if (getOfferingsError) {
    return <>Error</>;
  }

  if (getOfferingsLoading) {
    return <LoadingDots />;
  }

  return (
    <>
      {offerings.map((offering) => {
        return <OfferingCard key={offering.id} {...offering}></OfferingCard>;
      })}
    </>
  );
}

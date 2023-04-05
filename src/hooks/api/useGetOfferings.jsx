import { useEffect } from "react";

import handleResponseError from "@/src/errors/handleResponseError";
import useAsync from "@/src/hooks/useAsync";
import { offeringsApi } from "@/src/services/api";

export default function useGetOfferings({ status = null }) {
  const {
    data: offerings,
    loading: getOfferingsLoading,
    error: getOfferingsError,
    act: getOfferings,
  } = useAsync(() => offeringsApi.getOfferings({ status }));

  useEffect(() => {
    if (getOfferingsError) {
      handleResponseError(getOfferingsError);
    }
  }, [getOfferingsError]);

  return {
    offerings,
    getOfferingsLoading,
    getOfferingsError,
    getOfferings,
  };
}

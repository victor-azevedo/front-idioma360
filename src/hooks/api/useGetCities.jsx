import { useEffect } from "react";

import handleResponseError from "@/src/errors/handleResponseError";
import useAsync from "@/src/hooks/useAsync";
import { addressApi } from "@/src/services/api";

export const INITIAL_CITIES_LIST = [];

export default function useGetCitiesFromUF() {
  const {
    data: citiesList,
    loading: getCitiesLoading,
    error: getCitiesError,
    act: getCities,
  } = useAsync((uf) => addressApi.getCities(uf), false, INITIAL_CITIES_LIST);

  useEffect(() => {
    if (getCitiesError) {
      handleResponseError(getCitiesError);
    }
  }, [getCitiesError]);

  return {
    citiesList,
    getCitiesLoading,
    getCitiesError,
    getCities,
  };
}

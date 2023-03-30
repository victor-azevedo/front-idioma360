import { useEffect } from "react";

import handleResponseError from "@/src/errors/handleResponseError";
import useAsync from "@/src/hooks/useAsync";
import { addressApi } from "@/src/services/api";

export const INITIAL_STATES_LIST = [];

export default function useGetStates() {
  const {
    data: statesList,
    loading: getStatesLoading,
    error: getStatesError,
    act: getStates,
  } = useAsync(() => addressApi.getStates(), true, INITIAL_STATES_LIST);

  useEffect(() => {
    if (getStatesError) {
      handleResponseError(getStatesError);
    }
  }, [getStatesError]);

  return {
    statesList,
    getStatesLoading,
    getStatesError,
    getStates,
  };
}

import { useEffect } from "react";

import handleResponseError from "@/src/errors/handleResponseError";
import useAsync from "@/src/hooks/useAsync";
import { usersApi } from "@/src/services/api";

export default function useGetUserData(initialWithAddress = true) {
  const {
    data: userData,
    loading: getUserDataLoading,
    error: getUserDataError,
    act: getUserData,
  } = useAsync((withAddress = initialWithAddress) =>
    usersApi.getUserData(withAddress)
  );

  useEffect(() => {
    if (getUserDataError) {
      handleResponseError(getUserDataError);
    }
  }, [getUserDataError]);

  return {
    userData,
    getUserDataLoading,
    getUserDataError,
    getUserData,
  };
}

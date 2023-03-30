import { useEffect } from "react";

import handleResponseError from "@/src/errors/handleResponseError";
import useAsync from "@/src/hooks/useAsync";
import { addressApi } from "@/src/services/api";

export default function usePostAddress() {
  const {
    loading: postAddressLoading,
    error: postAddressError,
    act: postAddress,
  } = useAsync((data) => addressApi.postAddress(data), false);

  useEffect(() => {
    if (postAddressError) {
      handleResponseError(postAddressError);
    }
  }, [postAddressError]);

  return {
    postAddressLoading,
    postAddressError,
    postAddress,
  };
}

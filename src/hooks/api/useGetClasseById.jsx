import { useEffect } from "react";

import handleResponseError from "@/src/errors/handleResponseError";
import useAsync from "@/src/hooks/useAsync";
import { classesApi } from "@/src/services/api";

export default function useGetClasseById() {
  const {
    data: classe,
    loading: getClasseByIdLoading,
    error: getClasseByIdError,
    act: getClasseById,
  } = useAsync((id) => classesApi.getClasseById(id), false);

  useEffect(() => {
    if (getClasseByIdError) {
      handleResponseError(getClasseByIdError);
    }
  }, [getClasseByIdError]);

  return {
    classe,
    getClasseByIdLoading,
    getClasseByIdError,
    getClasseById,
  };
}

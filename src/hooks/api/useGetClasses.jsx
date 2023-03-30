import { useEffect } from "react";

import handleResponseError from "@/src/errors/handleResponseError";
import useAsync from "@/src/hooks/useAsync";
import { classesApi } from "@/src/services/api";

export default function useGetClasses() {
  const {
    data: classes,
    loading: getClassesLoading,
    error: getClassesError,
    act: getClasses,
  } = useAsync(() => classesApi.getClasses());

  useEffect(() => {
    if (getClassesError) {
      handleResponseError(getClassesError);
    }
  }, [getClassesError]);

  return {
    classes,
    getClassesLoading,
    getClassesError,
    getClasses,
  };
}

import handleResponseError from "@/src/errors/handleResponseError";
import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";
import { useEffect } from "react";

export default function useGetClasses() {
  const {
    data: classes,
    loading: getClassesLoading,
    error: getClassesError,
    act: getClasses,
  } = useAsync(() => resourcesApi.getAll({ resource: "classes" }));

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

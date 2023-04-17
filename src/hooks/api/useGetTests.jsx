import { useEffect } from "react";

import handleResponseError from "@/src/errors/handleResponseError";
import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";

export default function useGetTests() {
  const {
    data: tests,
    loading: getTestsLoading,
    error: getTestsError,
    act: getTests,
  } = useAsync(() => resourcesApi.getAll({ resource: "tests" }));

  useEffect(() => {
    if (getTestsError) {
      handleResponseError(getTestsError);
    }
  }, [getTestsError]);

  return {
    tests,
    getTestsLoading,
    getTestsError,
    getTests,
  };
}

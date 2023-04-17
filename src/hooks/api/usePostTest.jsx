import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";

export default function usePostTest() {
  const {
    loading: postTestLoading,
    error: postTestError,
    act: postTest,
  } = useAsync((data) => resourcesApi.post({ resource: "tests", data }), false);

  return {
    postTestLoading,
    postTestError,
    postTest,
  };
}

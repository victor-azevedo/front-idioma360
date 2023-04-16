import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";

export default function usePostClasse() {
  const {
    loading: postClasseLoading,
    error: postClasseError,
    act: postClasse,
  } = useAsync(
    (data) => resourcesApi.post({ resource: "classes", data }),
    false
  );
  return {
    postClasseLoading,
    postClasseError,
    postClasse,
  };
}

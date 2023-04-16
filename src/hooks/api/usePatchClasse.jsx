import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";

export default function usePatchClasse() {
  const {
    loading: patchClasseLoading,
    error: patchClasseError,
    act: patchClasse,
  } = useAsync(
    (id, data) => resourcesApi.patch({ resource: "classes", id, data }),
    false
  );
  return {
    patchClasseLoading,
    patchClasseError,
    patchClasse,
  };
}

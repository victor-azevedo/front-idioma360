import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";

export default function useDeleteClasse() {
  const {
    loading: deleteClasseLoading,
    error: deleteClasseError,
    act: deleteClasse,
  } = useAsync(
    (id) => resourcesApi.deleteResource({ resource: "classes", id }),
    false
  );
  return {
    deleteClasseLoading,
    deleteClasseError,
    deleteClasse,
  };
}

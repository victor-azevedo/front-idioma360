import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";

export default function useDeleteOffering() {
  const {
    loading: deleteOfferingLoading,
    error: deleteOfferingError,
    act: deleteOffering,
  } = useAsync(
    (id) => resourcesApi.deleteResource({ resource: "offerings", id }),
    false
  );
  return {
    deleteOfferingLoading,
    deleteOfferingError,
    deleteOffering,
  };
}

import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";

export default function usePatchOffering() {
  const {
    loading: patchOfferingLoading,
    error: patchOfferingError,
    act: patchOffering,
  } = useAsync(
    (id, data) => resourcesApi.patch({ resource: "offerings", id, data }),
    false
  );
  return {
    patchOfferingLoading,
    patchOfferingError,
    patchOffering,
  };
}

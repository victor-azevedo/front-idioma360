import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";

export default function usePostOffering() {
  const {
    loading: postOfferingLoading,
    error: postOfferingError,
    act: postOffering,
  } = useAsync(
    (data) => resourcesApi.post({ resource: "offerings", data }),
    false
  );
  return {
    postOfferingLoading,
    postOfferingError,
    postOffering,
  };
}

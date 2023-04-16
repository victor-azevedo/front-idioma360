import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";

export default function useGetOfferingById() {
  const {
    data: offeringData,
    loading: getOfferingByIdLoading,
    error: getOfferingByIdError,
    act: getOfferingById,
  } = useAsync(
    (id) => resourcesApi.getById({ resource: "offerings", id }),
    false
  );
  return {
    offeringData,
    getOfferingByIdLoading,
    getOfferingByIdError,
    getOfferingById,
  };
}

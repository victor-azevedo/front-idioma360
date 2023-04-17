import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";

export default function useGetTestByIdAdmin() {
  const {
    data: test,
    loading: getTestByIdAdminLoading,
    error: getTestByIdAdminError,
    act: getTestByIdAdmin,
  } = useAsync(
    (id) => resourcesApi.getById({ resource: "tests/admin", id }),
    false
  );

  return {
    test,
    getTestByIdAdminLoading,
    getTestByIdAdminError,
    getTestByIdAdmin,
  };
}

import useAsync from "@/src/hooks/useAsync";
import { testsApi } from "@/src/services/api";

export default function useGetTestById() {
  const {
    data: test,
    loading: getTestByIdLoading,
    error: getTestByIdError,
    act: getTestById,
  } = useAsync((id) => testsApi.getTestById(id), false);

  return {
    test,
    getTestByIdLoading,
    getTestByIdError,
    getTestById,
  };
}

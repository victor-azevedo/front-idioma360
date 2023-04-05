import useAsync from "@/src/hooks/useAsync";
import { testsApi } from "@/src/services/api";

export default function usePostUserTestAnswers() {
  const {
    loading: postUserTestAnswersLoading,
    error: postUserTestAnswersError,
    act: postUserTestAnswers,
  } = useAsync(
    ({ id, body }) => testsApi.postUserTestAnswers({ id, body }),
    false
  );

  return {
    postUserTestAnswersLoading,
    postUserTestAnswersError,
    postUserTestAnswers,
  };
}

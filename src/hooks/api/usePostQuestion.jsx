import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";

export default function usePostQuestion() {
  const {
    loading: postQuestionLoading,
    error: postQuestionError,
    act: postQuestion,
  } = useAsync(
    (data) => resourcesApi.post({ resource: "questions", data }),
    false
  );
  return {
    postQuestionLoading,
    postQuestionError,
    postQuestion,
  };
}

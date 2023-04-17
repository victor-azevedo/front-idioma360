import handleResponseError from "@/src/errors/handleResponseError";
import useAsync from "@/src/hooks/useAsync";
import { resourcesApi } from "@/src/services/api/resources-api";
import { useEffect } from "react";

export default function useDeleteQuestion() {
  const {
    loading: deleteQuestionLoading,
    error: deleteQuestionError,
    act: deleteQuestion,
  } = useAsync(
    (id) => resourcesApi.deleteResource({ resource: "questions", id }),
    false
  );

  useEffect(() => {
    if (deleteQuestionError) {
      handleResponseError(deleteQuestionError);
    }
  }, [deleteQuestionError]);

  return {
    deleteQuestionLoading,
    deleteQuestionError,
    deleteQuestion,
  };
}

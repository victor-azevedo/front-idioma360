import handleResponseError from "@/src/errors/handleResponseError";
import useAsync from "@/src/hooks/useAsync";
import { coursesApi } from "@/src/services/api";
import { useEffect } from "react";

export default function useDeleteCourse() {
  const {
    loading: deleteCourseLoading,
    error: deleteCourseError,
    act: deleteCourse,
  } = useAsync((id) => coursesApi.deleteCourse(id), false);

  useEffect(() => {
    if (deleteCourseError) {
      handleResponseError(deleteCourseError);
    }
  }, [deleteCourseError]);

  return {
    deleteCourseLoading,
    deleteCourseError,
    deleteCourse,
  };
}

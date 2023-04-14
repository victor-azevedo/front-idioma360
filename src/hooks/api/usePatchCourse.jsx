import useAsync from "@/src/hooks/useAsync";
import { coursesApi } from "@/src/services/api";

export default function usePatchCourse() {
  const {
    loading: postCourseLoading,
    error: postCourseError,
    act: postCourse,
  } = useAsync((id, data) => coursesApi.patchCourse(id, data), false);
  return {
    postCourseLoading,
    postCourseError,
    postCourse,
  };
}

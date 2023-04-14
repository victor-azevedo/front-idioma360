import useAsync from "@/src/hooks/useAsync";
import { coursesApi } from "@/src/services/api";

export default function usePatchCourse() {
  const {
    loading: patchCourseLoading,
    error: patchCourseError,
    act: patchCourse,
  } = useAsync((id, data) => coursesApi.patchCourse(id, data), false);
  return {
    patchCourseLoading,
    patchCourseError,
    patchCourse,
  };
}

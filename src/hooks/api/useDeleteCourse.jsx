import useAsync from "@/src/hooks/useAsync";
import { coursesApi } from "@/src/services/api";

export default function useDeleteCourse() {
  const {
    loading: deleteCourseLoading,
    error: deleteCourseError,
    act: deleteCourse,
  } = useAsync((id) => coursesApi.deleteCourse(id), false);
  return {
    deleteCourseLoading,
    deleteCourseError,
    deleteCourse,
  };
}

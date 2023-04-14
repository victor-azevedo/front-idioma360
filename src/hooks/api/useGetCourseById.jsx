import useAsync from "@/src/hooks/useAsync";
import { coursesApi } from "@/src/services/api";

export default function useGetCourseById() {
  const {
    data: courseData,
    loading: getCourseByIdLoading,
    error: getCourseByIdError,
    act: getCourseById,
  } = useAsync((id) => coursesApi.getCourseById(id), false);
  return {
    courseData,
    getCourseByIdLoading,
    getCourseByIdError,
    getCourseById,
  };
}

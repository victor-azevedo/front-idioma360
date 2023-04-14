import useAsync from "@/src/hooks/useAsync";
import { coursesApi } from "@/src/services/api";

export default function usePostCourse() {
  const {
    loading: postCourseLoading,
    error: postCourseError,
    act: postCourse,
  } = useAsync((data) => coursesApi.postCourse(data), false);
  return {
    postCourseLoading,
    postCourseError,
    postCourse,
  };
}

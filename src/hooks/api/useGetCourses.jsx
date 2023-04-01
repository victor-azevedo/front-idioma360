import { useEffect } from "react";

import handleResponseError from "@/src/errors/handleResponseError";
import useAsync from "@/src/hooks/useAsync";
import { coursesApi } from "@/src/services/api";

export default function useGetCourses() {
  const {
    data: courses,
    loading: getCoursesLoading,
    error: getCoursesError,
    act: getCourses,
  } = useAsync(() => coursesApi.getCourses());

  useEffect(() => {
    if (getCoursesError) {
      handleResponseError(getCoursesError);
    }
  }, [getCoursesError]);

  return {
    courses,
    getCoursesLoading,
    getCoursesError,
    getCourses,
  };
}

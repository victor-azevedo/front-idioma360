import { useEffect } from "react";

import handleResponseError from "@/src/errors/handleResponseError";
import useAsync from "@/src/hooks/useAsync";
import { coursesApi } from "@/src/services/api";

export default function useGetCoursesClasses(status) {
  const {
    data: coursesClasses,
    loading: getCoursesClassesLoading,
    error: getCoursesClassesError,
    act: getCoursesClasses,
  } = useAsync(() => coursesApi.getCoursesClasses(status));

  useEffect(() => {
    if (getCoursesClassesError) {
      handleResponseError(getCoursesClassesError);
    }
  }, [getCoursesClassesError]);

  return {
    coursesClasses,
    getCoursesClassesLoading,
    getCoursesClassesError,
    getCoursesClasses,
  };
}

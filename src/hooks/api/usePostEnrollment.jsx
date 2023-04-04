import useAsync from "@/src/hooks/useAsync";
import { enrollmentsApi } from "@/src/services/api/enrollments-api";

export default function usePostEnrollment() {
  const {
    loading: postEnrollmentLoading,
    error: postEnrollmentError,
    act: postEnrollment,
  } = useAsync((classId) => enrollmentsApi.postEnrollment(classId), false);

  return {
    postEnrollmentLoading,
    postEnrollmentError,
    postEnrollment,
  };
}

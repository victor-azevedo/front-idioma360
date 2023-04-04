import useAsync from "@/src/hooks/useAsync";
import { offeringsApi } from "@/src/services/api";

export default function usePostEnrollment() {
  const {
    loading: postEnrollmentLoading,
    error: postEnrollmentError,
    act: postEnrollment,
  } = useAsync((classId) => offeringsApi.postEnrollment(classId), false);

  return {
    postEnrollmentLoading,
    postEnrollmentError,
    postEnrollment,
  };
}

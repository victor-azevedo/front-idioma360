import useAsync from "@/src/hooks/useAsync";
import { offeringsApi } from "@/src/services/api";

export default function usePostEnrollment() {
  const {
    loading: postEnrollmentLoading,
    error: postEnrollmentError,
    act: postEnrollment,
  } = useAsync((id) => offeringsApi.postEnrollment(id), false);

  return {
    postEnrollmentLoading,
    postEnrollmentError,
    postEnrollment,
  };
}

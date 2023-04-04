import useAsync from "@/src/hooks/useAsync";
import { enrollmentsApi } from "@/src/services/api";

export default function useGetUserEnrollments() {
  const {
    data: userEnrollments,
    loading: getUserEnrollmentsLoading,
    error: getUserEnrollmentsError,
    act: getUserEnrollments,
  } = useAsync(() => enrollmentsApi.getUserEnrollments());

  return {
    userEnrollments,
    getUserEnrollmentsLoading,
    getUserEnrollmentsError,
    getUserEnrollments,
  };
}

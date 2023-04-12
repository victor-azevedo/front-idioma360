import useAsync from "@/src/hooks/useAsync";
import { usersApi } from "@/src/services/api";
import { useAuth } from "../use-auth";

export default function useGetUserData(initialWithAddress = true) {
  const {
    user: { userId },
  } = useAuth();

  const {
    data: userData,
    loading: getUserDataLoading,
    error: getUserDataError,
    act: getUserData,
  } = useAsync((withAddress = initialWithAddress) =>
    usersApi.getUserData({ userId: userId, withAddress })
  );

  return {
    userData,
    getUserDataLoading,
    getUserDataError,
    getUserData,
  };
}

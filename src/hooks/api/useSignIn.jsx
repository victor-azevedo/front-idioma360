import useAsync from "@/src/hooks/useAsync";
import { authApi } from "@/src/services/api";

export default function useSignIn() {
  const {
    loading: signInLoading,
    error: signInError,
    act: postSignIn,
  } = useAsync((data) => authApi.postSignIn(data), false);

  return {
    signInLoading,
    signInError,
    postSignIn,
  };
}

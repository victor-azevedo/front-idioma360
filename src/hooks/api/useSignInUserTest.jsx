import useAsync from "@/src/hooks/useAsync";
import { authApi } from "@/src/services/api";

export default function useSignInUserTest() {
  const {
    loading: signInLoading,
    error: signInError,
    act: postSignInUserTest,
  } = useAsync((data) => authApi.postSignInUserTest(data), false);

  return {
    signInLoading,
    signInError,
    postSignInUserTest,
  };
}

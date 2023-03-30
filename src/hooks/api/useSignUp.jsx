import useAsync from "@/src/hooks/useAsync";
import { authApi } from "@/src/services/api";

export default function useSignUp() {
  const {
    loading: signUpLoading,
    error: signUpError,
    act: postSignUp,
  } = useAsync((data) => authApi.postSignUp(data), false);

  return {
    signUpLoading,
    signUpError,
    postSignUp,
  };
}

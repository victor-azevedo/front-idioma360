import { api } from "./api-service";

export async function postSignUp(data) {
  const response = await api.post("/sign-up", data);

  return response.data;
}

export const authApi = {
  postSignUp,
};

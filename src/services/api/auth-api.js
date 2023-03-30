import { api } from "./api-service";

export async function postSignUp(data) {
  const response = await api.post("/sign-up", data);

  return response.data;
}

export async function postSignIn(data) {
  const response = await api.post("/sign-in", data);

  return response.data;
}

export const authApi = {
  postSignUp,
  postSignIn,
};

import { api } from "./api-service";

async function getUserData({ userId, withAddress = false }) {
  const query = withAddress ? `?address=${withAddress}` : "";

  const response = await api.get(`/users/${userId}${query}`);

  return response.data;
}

export const usersApi = {
  getUserData,
};

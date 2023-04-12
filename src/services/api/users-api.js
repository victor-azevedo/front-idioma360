import { apiAuth } from "./api-service";

async function getUserData({ userId, withAddress = false }) {
  const query = withAddress ? `?address=${withAddress}` : "";

  const response = await apiAuth.get(`/users/${userId}${query}`);

  return response.data;
}

export const usersApi = {
  getUserData,
};

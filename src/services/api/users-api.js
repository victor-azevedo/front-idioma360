import { tokenService } from "../token-service";
import { apiAuth } from "./api-service";

async function getUserData(withAddress = false) {
  const { userId } = tokenService.decode();
  const query = withAddress ? `?address=${withAddress}` : "";

  const response = await apiAuth.get(`/users/${userId}${query}`);

  return response.data;
}

export const usersApi = {
  getUserData,
};

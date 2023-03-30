import { apiAuth } from "./api-service";

export async function postAddress(data) {
  const response = await apiAuth.post("/user/address", data);

  return response.data;
}

export async function getAddress() {
  const response = await apiAuth.get("/user/address");

  return response.data;
}

export async function getStates() {
  const response = await apiAuth.get("/address/states");

  return response.data;
}

export async function getCities(uf) {
  const response = await apiAuth.get(`/address/cities?uf=${uf}`);

  return response.data;
}

export const addressApi = {
  postAddress,
  getAddress,
  getStates,
  getCities,
};

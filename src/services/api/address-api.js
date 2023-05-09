import { api } from "./api-service";

export async function postAddress(data) {
  const response = await api.post("/address/user", data);

  return response.data;
}

export async function getAddress() {
  const response = await api.get("/user/address");

  return response.data;
}

export async function getStates() {
  const response = await api.get("/address/states");

  return response.data;
}

export async function getCities(uf) {
  const response = await api.get(`/address/cities?uf=${uf}`);

  return response.data;
}

export const addressApi = {
  postAddress,
  getAddress,
  getStates,
  getCities,
};

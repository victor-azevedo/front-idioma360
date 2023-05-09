import { api } from "./api-service";

export async function getOfferings({ status }) {
  const query = status ? `?status=${status}` : "";

  const response = await api.get(`/offerings${query}`);

  return response.data;
}

export const offeringsApi = {
  getOfferings,
};

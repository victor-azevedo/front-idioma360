import { apiAuth } from "./api-service";

export async function getOfferings({ status }) {
  const query = status ? `?status=${status}` : "";

  const response = await apiAuth.get(`/offerings${query}`);

  return response.data;
}

export const offeringsApi = {
  getOfferings,
};

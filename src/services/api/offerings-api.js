import { apiAuth } from "./api-service";

export async function getOfferings() {
  const response = await apiAuth.get("/offerings");

  return response.data;
}

export const offeringsApi = {
  getOfferings,
};

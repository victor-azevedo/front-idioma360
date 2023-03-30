import { apiAuth } from "./api-service";

export async function getOfferings() {
  const response = await apiAuth.get("/offerings");

  return response.data;
}

export async function postEnrollment(id) {
  const response = await apiAuth.get(`/offerings/${id}/enrollments`);

  return response.data;
}

export const offeringsApi = {
  getOfferings,
  postEnrollment,
};

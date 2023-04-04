import { apiAuth } from "./api-service";

export async function getOfferings() {
  const response = await apiAuth.get("/offerings");

  return response.data;
}

export async function postEnrollment(classId) {
  const body = {
    classId,
  };
  const response = await apiAuth.post("/offering", body);

  return response.data;
}

export const offeringsApi = {
  getOfferings,
  postEnrollment,
};

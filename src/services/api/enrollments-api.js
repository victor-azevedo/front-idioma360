import { apiAuth } from "./api-service";

export async function postEnrollment(classeId) {
  const body = {
    classeId,
  };
  const response = await apiAuth.post("/enroll", body);

  return response.data;
}

export async function getUserEnrollments() {
  const response = await apiAuth.get("/enroll/user");

  return response.data;
}

export const enrollmentsApi = {
  postEnrollment,
  getUserEnrollments,
};

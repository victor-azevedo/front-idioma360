import { api } from "./api-service";

export async function postEnrollment(classeId) {
  const body = {
    classeId,
  };
  const response = await api.post("/enroll", body);

  return response.data;
}

export async function getUserEnrollments() {
  const response = await api.get("/enroll/user");

  return response.data;
}

export const enrollmentsApi = {
  postEnrollment,
  getUserEnrollments,
};

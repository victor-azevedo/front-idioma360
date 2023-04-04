import { apiAuth } from "./api-service";

export async function postEnrollment(classId) {
  const body = {
    classId,
  };
  const response = await apiAuth.post("/enroll", body);

  return response.data;
}

export const enrollmentsApi = {
  postEnrollment,
};

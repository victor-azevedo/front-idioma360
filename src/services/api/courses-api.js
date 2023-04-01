import { apiAuth } from "./api-service";

export async function getCourses() {
  const response = await apiAuth.get("/courses");

  return response.data;
}

export const coursesApi = {
  getCourses,
};

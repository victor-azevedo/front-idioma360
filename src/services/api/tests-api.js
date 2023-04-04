import { apiAuth } from "./api-service";

async function getTestById(id) {
  const response = await apiAuth.get(`/tests/${id}`);

  return response.data;
}

export const testsApi = {
  getTestById,
};

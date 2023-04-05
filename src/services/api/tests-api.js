import { apiAuth } from "./api-service";

async function getTestById(id) {
  const response = await apiAuth.get(`/tests/${id}`);

  return response.data;
}

async function postUserTestAnswers({ id, body }) {
  const response = await apiAuth.post(`/tests/${id}/userAnswers`, body);

  return response.data;
}

export const testsApi = {
  getTestById,
  postUserTestAnswers,
};

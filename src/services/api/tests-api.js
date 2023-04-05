import handleResponseError from "@/src/errors/handleResponseError";
import { apiAuth } from "./api-service";

async function getTestById(id) {
  try {
    const response = await apiAuth.get(`/tests/${id}`);

    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
}

async function postUserTestAnswers({ id, body }) {
  const response = await apiAuth.post(`/tests/${id}/userAnswers`, body);

  return response.data;
}

export const testsApi = {
  getTestById,
  postUserTestAnswers,
};

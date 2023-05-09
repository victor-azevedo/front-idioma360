import handleResponseError from "@/src/errors/handleResponseError";
import { api } from "./api-service";

async function getTestById(id) {
  try {
    const response = await api.get(`/tests/${id}`);

    return response.data;
  } catch (error) {
    handleResponseError(error);
  }
}

async function postUserTestAnswers({ id, body }) {
  const response = await api.post(`/tests/${id}/userAnswers`, body);

  return response.data;
}

export const testsApi = {
  getTestById,
  postUserTestAnswers,
};

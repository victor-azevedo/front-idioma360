import { api } from "./api-service";

export async function getClasses() {
  const response = await api.get("/classes");

  return response.data;
}

export async function getClasseById(id) {
  const response = await api.get(`/classes/${id}`);

  return response.data;
}

export const classesApi = {
  getClasses,
  getClasseById,
};

import { api } from "./api-service";

export async function getAll({ resource }) {
  const response = await api.get(`/${resource}`);

  return response.data;
}

async function getById({ resource, id }) {
  const response = await api.get(`/${resource}/${id}`);

  return response.data;
}

async function post({ resource, data }) {
  const response = await api.post(`/${resource}`, data);

  return response.data;
}

async function patch({ resource, id, data }) {
  const response = await api.patch(`/${resource}/${id}`, data);

  return response.data;
}

async function deleteResource({ resource, id }) {
  const response = await api.delete(`/${resource}/${id}`);

  return response.data;
}

export const resourcesApi = {
  getAll,
  getById,
  post,
  patch,
  deleteResource,
};

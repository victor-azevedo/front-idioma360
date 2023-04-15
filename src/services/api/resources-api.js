import { apiAuth } from "./api-service";

export async function getAll({ resource }) {
  const response = await apiAuth.get(`/${resource}`);

  return response.data;
}

async function getById({ resource, id }) {
  const response = await apiAuth.get(`/${resource}/${id}`);

  return response.data;
}

async function post({ resource, data }) {
  const response = await apiAuth.post(`/${resource}`, data);

  return response.data;
}

async function patch({ resource, id, data }) {
  const response = await apiAuth.patch(`/${resource}/${id}`, data);

  return response.data;
}

async function deleteResource({ resource, id }) {
  const response = await apiAuth.delete(`/${resource}/${id}`);

  return response.data;
}

export const resourcesApi = {
  getAll,
  getById,
  post,
  patch,
  deleteResource,
};

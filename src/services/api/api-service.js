import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

function setAuthorization(token) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

function deleteAuthorization() {
  api.defaults.headers.Authorization = undefined;
}

export const apiService = {
  setAuthorization,
  deleteAuthorization,
};

import axios from "axios";

export const server = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export function configClient(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

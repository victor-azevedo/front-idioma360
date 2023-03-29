import axios from "axios";

import { tokenService } from "@/src/services/token-service";

const token = tokenService.get();

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const apiAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

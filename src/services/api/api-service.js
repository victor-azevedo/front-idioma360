import axios from "axios";

import { tokenService } from "@/src/services/token-service";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

export const apiAuth = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    Authorization: `Bearer ${tokenService.get()}`,
  },
});

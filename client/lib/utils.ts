import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const api = axios.create({
  baseURL: process.env.SERVER_URL,
  withCredentials: true,
});

export default api;

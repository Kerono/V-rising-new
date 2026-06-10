import { config } from "@/config";

export function getApiUrl() {
  if (typeof window === "undefined") {
    return config.SERVER_BACKEND_URL;
  }

  return config.CLIENT_BACKEND_URL;
}

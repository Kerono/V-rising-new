import { inDevelopment } from "@/variables";
import { getApiUrl } from "./getApiUrl";

export const getData = async <T>(path: string): Promise<T> => {
  const baseUrl = getApiUrl();
  const response = await fetch(`${baseUrl}${path}`, {
    headers: { "Access-Control-Allow-Origin": "*" },
  });

  if (!response.ok) {
    throw new Error(`Something went wrong ${response.status}`);
  }

  const data = await response.json();

  if (inDevelopment) {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve(data);
      }, 1000),
    );
  }

  return data;
};

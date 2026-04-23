import { inDevelopment } from "@/variables";

export const getData = async <T>(url: string): Promise<T> => {
  const response = await fetch(url);

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

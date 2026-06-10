import { config } from "@/config";

export const imageUrl = (img: string) =>
  `${config.SERVER_BACKEND_URL}images/${img}`;

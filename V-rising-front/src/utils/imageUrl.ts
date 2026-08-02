import { config } from "@/config";

export const imageUrl = (img: string) =>
  `${config.CLIENT_BACKEND_URL}images/${img}`;

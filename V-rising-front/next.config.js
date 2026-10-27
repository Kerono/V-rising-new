//TODO improve
const SERVER_BACKEND_URL =
  process.env.NEXT_PUBLIC_SERVER_BACKEND_URL || "http://backend:3000/";

const CLIENT_BACKEND_URL =
  process.env.NEXT_PUBLIC_CLIENT_BACKEND_URL || "http://localhost:3000/**";

const nextConfig = {
  images: {
    remotePatterns: [
      new URL(`${SERVER_BACKEND_URL}**`),
      new URL(`${CLIENT_BACKEND_URL}**`),
    ],
  },
};

export default nextConfig;

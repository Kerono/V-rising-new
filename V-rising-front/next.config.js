const nextConfig = {
  images: {
    remotePatterns: [
      new URL(`${process.env.NEXT_PUBLIC_SERVER_BACKEND_URL}**`),
      new URL(`${process.env.NEXT_PUBLIC_CLIENT_BACKEND_URL}**`),
    ],
  },
};

export default nextConfig;

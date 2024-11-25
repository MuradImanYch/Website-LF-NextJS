/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https", // если домен поддерживает только https
        hostname: "legfootball.com",
        pathname: "/assets/news/**", // Путь к изображениям
      },
      {
        protocol: "http", // или https, в зависимости от вашего домена
        hostname: "78.46.254.73",
        pathname: "/assets/news/**",
      },
    ],
  },
};

export default nextConfig;
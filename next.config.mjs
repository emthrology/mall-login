/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // 클라이언트와 서버 모두에서 접근 가능
    apiUrl: process.env.NEXT_PUBLIC_API_URL,
  },
};

export default nextConfig;

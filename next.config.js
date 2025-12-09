/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['cdn.magicui.design'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.magicui.design',
      },
    ],
  },
}

module.exports = nextConfig

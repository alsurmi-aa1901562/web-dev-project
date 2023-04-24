/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  async rewrites() {
    return [
      {
        source: '/api/user',
        destination: 'http://localhost:3000/api/user',
      },
    ]
  },
}

module.exports = nextConfig

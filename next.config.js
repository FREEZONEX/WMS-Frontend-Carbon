/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/wmsbackendapi/:slug*',
        destination: `http://localhost:8080/:slug*`,
      },
      //destination: `http://47.236.10.165:30085/:slug*`,
    ];
  },
};

module.exports = nextConfig;

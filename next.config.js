/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/wmsbackendapi/:slug*',
        destination: `http://localhost:8085/:slug*`,
      },
      //destination: `http://openiiot-server-service.openiiot:8085/:slug*`,
    ];
  },
};

module.exports = nextConfig;

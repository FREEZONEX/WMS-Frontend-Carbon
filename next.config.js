/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/wmsbackendapi/:slug*',
        destination: `http://47.236.10.165:30085/:slug*`,
      },
      //destination: `http://openiiot-server-service.openiiot:8085/:slug*`,
    ];
  },
};

module.exports = nextConfig;

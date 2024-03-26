/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PATH_PREFIX: '',
  },
  async rewrites() {
    return [
      {
        source: '/wmsbackendapi/:slug*',
        destination: `http://office.unibutton.com:6585//:slug*`,
        // destination: `http://localhost:8080/:slug*`,
      },
      //destination: `http://office.unibutton.com:6585//:slug*`,
    ];
  },
};

module.exports = nextConfig;

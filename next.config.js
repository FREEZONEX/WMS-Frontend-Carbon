/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PATH_PREFIX: '',
  },
  async rewrites() {
    let destination;

    switch (process.env.RUNTIME_IDC_NAME) {
      case 'local':
        destination = 'http://127.0.0.1:8085/:slug*'; // Local development destination
        break;
      case 'sg':
        destination = 'wms-server-service.wms/:slug*'; // Production destination in China
        break;
      case 'cn':
        destination = 'http://office.unibutton.com:6585//:slug*'; // Example destination for Singapore
        break;
      default:
        destination = 'http://47.236.10.165:30085/:slug*'; // Default or fallback destination
    }

    return [
      {
        source: '/wmsbackendapi/:slug*',
        destination: destination,
      },
    ];
  },
};

module.exports = nextConfig;

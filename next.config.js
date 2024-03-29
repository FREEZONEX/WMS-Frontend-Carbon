/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    PATH_PREFIX: '/apps/wenhao-javaw',
    // PATH_PREFIX: '',
  },
  output: 'export',
  assetPrefix: '/apps/wenhao-javaw', //加前缀
  // async rewrites() {
  //   return [
  //     {
  //       source: '/:slug*',
  //       destination: `http://office.unibutton.com:6585//:slug*`,
  //       // destination: `http://localhost:8085/:slug*`,
  //     },
  //     //destination: `http://47.236.10.165:30085/:slug*`,
  //   ];
  // },
};

module.exports = nextConfig;

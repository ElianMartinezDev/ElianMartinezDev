const withTM = require('next-transpile-modules')();

module.exports = withTM({
  swcMinify: false,
  trailingSlash: true,
  env: {
    // HOST
    HOST_API_KEY: 'https://server.estacionsigma.com',
    //HOST 2
    HOST_API2_KEY: 'https://ncf.estacionsigma.com',
    HOST_APP_NAME: 'CALIPSO 3.0',
    //KEY_SECRET
    APP_API: 'C9A1E9820472834883A7C8CA67EF62B66047B80DA652818819BB039830CD3E94',
  },
});

const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#BA3BFA',
              '@seconday-color': '#F9EDFF',
              '@text-color': '#000000',
              '@text-secondary-color': '#9B9B9B',
              '@font-family': 'Poppins'
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
module.exports = {
  devServer: {
    host: 'localhost',
    port: 7000,
    public: 'http://125.212.203.148/dashboard/',
    watchOptions: {
      poll: true,
    },
    disableHostCheck: true,
    https: false,
    hot: true,
  },
  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
  publicPath: './',
  productionSourceMap: false,  
  outputDir: './dist',
  // assetsDir: './static',
  indexPath: 'index.html',
}

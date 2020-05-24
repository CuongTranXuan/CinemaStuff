module.exports = {
  devServer: {
    host: 'localhost',
    port: 7000,
    public: 'http://125.212.138.107/dashboard/',
    watchOptions: {
      poll: true,
    },
    disableHostCheck: true,
    https: false,
    hot: true,
  },
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/dashboard/',
  transpileDependencies: ['vuetify'],

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false,
    },
  },
}

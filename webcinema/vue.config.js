// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
module.exports = {
  devServer: {
    host: 'localhost',
    port: 3000,
    public: 'http://125.212.138.107/film/',
    watchOptions: {
      poll: true
    },
    disableHostCheck: true, 
    https: false,
    hot: true
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/styles.scss";`
      }
    }
  },
  publicPath: '/film/',
  productionSourceMap: false,  
  outputDir: './dist',
  assetsDir: './static',
  indexPath: 'index.html'
};

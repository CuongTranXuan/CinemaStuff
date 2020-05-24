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
    // proxy: {
    //   '/': {
    //       target: 'http://localhost:3000',
    //       changeOrigin: true,
    //       pathRewrite: {
    //           '^/sockjs-node': ''
    //       },
    //   }
    // }
  },
  // configureWebpack: {
  //   plugins: [
  //     new BundleAnalyzerPlugin({
  //       analyzerPort: 8000
  //     })
  //   ]
  // },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/scss/styles.scss";`
      }
    }
  },
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/film/"
};

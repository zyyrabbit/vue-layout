const path = require('path');

module.exports = {
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(path.resolve('src/assets/svg'))
      .end();
    config.module
      .rule('svg-icon')
      .test(/\.svg$/)
      .include.add(path.join(__dirname, '.', 'src/assets/svg'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: '[name]',
      });
    config.plugins.delete('prefetch');
    config.plugins.delete('preload');
    config.plugins.delete('fork-ts-checker');
  },
  productionSourceMap: false,
  outputDir: 'dist',
  baseUrl: '/',
  assetsDir: '',
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    hot: true,
    public: '',
    logLevel: 'debug',
    overlay: {
      warnings: true,
      errors: true,
    },
  },
  css: {
    loaderOptions: {
      // pass options to sass-loader
      sass: {
        // @/ is an alias to src/
        // so this assumes you have a file named `src/variables.scss`
        implementation: require('sass'),
        data: `@import "@/assets/_variables.scss";`,
      },
    },
  },
};

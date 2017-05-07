const { mix } = require('laravel-mix');
const webpack = require('webpack');
const path    = require('path');
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

var BrowserSyncPlugin = require('browser-sync-webpack-plugin');


mix.react('resources/assets/js/app.jsx', 'public/js').extract(
  ['jquery']
).sass('resources/assets/sass/app.scss', 'public/css').copy(
  'resources/assets/img', 'public/img'
);



mix.webpackConfig({
  plugins: [
    new BrowserSyncPlugin({
      host: 'nails.loc',
      proxy: 'http://nails.loc/'
    })
  ],
  watchOptions: {
    poll: 1500,
    ignored: /node_modules|app|bootstrap|config|database|public|routes|storage|tests|vendor/
  }
  // ,externals: {
  //   jquery: 'jQuery',
  //   $: 'jQuery'
  // }

});

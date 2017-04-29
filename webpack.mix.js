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
  ['jquery', './node_modules/materialize-css/dist/js/materialize.js']
).sass('resources/assets/sass/app.scss', 'public/css');



mix.webpackConfig({
  // entry: {
  //   vendor: ['jquery', './node_modules/materialize-css/dist/js/materialize.js'],
  //   app: './resources/assets/js/app.jsx'
  // },
  // output: {
  //   path: path.resolve(__dirname, 'public/js'),
  //   filename: '[name].js'
  // },
  plugins: [
    new BrowserSyncPlugin({
      host: 'nails.loc',
      proxy: 'http://nails.loc/'
      // server: { baseDir: ['public'] }
    })

    // The CommonsChunkPlugin is an opt-in feature that creates a separate file
    // (known as a chunk), consisting of common modules shared between multiple
    // entry points.
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'vendor',
    //   minChunks: Infinity
    // }),
  ]
});

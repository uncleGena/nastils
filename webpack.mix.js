const { mix } = require('laravel-mix');

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


mix.react('resources/assets/js/app.jsx', 'public/js')
   .sass('resources/assets/sass/app.scss', 'public/css');



mix.webpackConfig({
  plugins: [
    new BrowserSyncPlugin()
  ]
});

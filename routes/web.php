<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('{reactRoutes}', function () {
    return view('welcome');
})->where('reactRoutes', '^((?!api).)*$');

// Route::get('/clients', function() {
//     return view('welcome');
// });

Route::resource('api/clients', 'ClientController');

Route::get('api/something/2', function() {
    return [
        'hello' => 'good bye',
        'dog' => 'cat'
    ];
});


// Route::get('{path?}', 'Controller@action')->where('path', '.*');
// Route::get('/{path?}', function() {
    // return 'custom route';
    // return view('welcome');
// });

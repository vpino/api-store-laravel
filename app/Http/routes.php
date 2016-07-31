<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function(){
	return view('welcome');
});

/* El middleware cors, le da permisos a que las rutas puedan 
*	ser accedidas de distantas apps
*/
Route::group(['middleware' => 'cors'], function() {
	/* Creamos una ruta recibe 2 parametros:
	*	1. Name
	*	2. Controller
	*/
	Route::post('/auth_login', 'ApiAuthController@userAuth');

});
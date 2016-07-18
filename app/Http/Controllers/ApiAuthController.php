<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

use JWTAuth;

class ApiAuthController extends Controller
{
    //Funcion de auntentificacion
    public function userAuth(Request $request){
    	/* Definimos las credenciales:
    	Solo recibira el email y el password */
    	$credentials = $request->only('email', 'password');
    	$token = null;

    	try{
    		/* Si JWTAuth no asigna el token correctamente:
    		 * Si se ingreso la el email o la contraseña le
    		 * retornamos un error 
    		*/
    		if(!$token = JWTAuth::attempt($credentials)) {
    			return response()->json(['error' => 'invalid_credentials']);
    		}

    	}catch(JWTException $ex){

    		return response()->json(['error' => 'something_went_wrong'], 500);

    	}

    	/* Retornamos el token creado */
    	return response()->json(compact('token'));

    }
}

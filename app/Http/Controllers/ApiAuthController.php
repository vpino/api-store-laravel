<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\User;
use JWTAuth;

class ApiAuthController extends Controller
{
    //Funcion de auntentificacion
    public function userAuth(Request $request){
    	/* Definimos las credenciales:
    	Solo recibira el email y el password */
    	$credentials = $request->only('email', 'password');
    	$token = null;
        $user = null;

    	try{
            /* Si el usuario se logueo por una red social*/
            if (!$request->has('password')){

                /* Buscamos al usuario */
                $user = User::where('email', $request->input('email'))->first();

                /* Si el usuario no existe, lo creamos*/
                if(empty($user)){
                    $user = User::create([
                        'name' => $request->input('name'),
                        'email' => $request->input('email'),
                        'avatar' => $request->input('avatar')
                        ]);
                }
    		
                if (!$token = JWTAuth::fromUser($user)){
                    return response()->json(['error' => 'invalid_credentials'], 500);
                }

    		} else {

                /* Si JWTAuth no asigna el token correctamente:
                 * Si se ingreso la el email o la contraseña le
                 * retornamos un error 
                */
                if(!$token = JWTAuth::attempt($credentials)) {
        			return response()->json(['error' => 'invalid_credentials'], 500);
        		}

                /* Buscamos el usuario que esta relacionado con el token */
                $user = JWTAuth::toUser($token);

            }

    	}catch(JWTException $ex){

    		return response()->json(['error' => 'something_went_wrong'], 500);

    	}

    	/* Retornamos el token creado y la data del usuario*/
    	return response()->json(compact('token', 'user'));

    }
}

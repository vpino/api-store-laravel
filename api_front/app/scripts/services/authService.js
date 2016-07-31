'use strict';


angular.module('authService', [])
	/* Factory encargado de almacenar las 
	   variables de session

	*/
	.factory('sessionControl', function(){
		return{
			
			get: function(key){
				return sessionStorage.getItem(key);
			},

			set: function(key, value){
				return sessionStorage.setItem(key, value);
			},

			unset: function(key){
				return sessionStorage.removeItem(key);
			}

		};
	})

	/* Factory encargada del logueo 

	Parametros:

		auth: Objeto encargado de hacer el logueo
			  mediante satellizer.

		sessionControl: Objeto encargado de hacer las
						variable de sesion cuando el
						usuario se logue.

	*/
	.factory('authUser', function($auth, GooglePlus, sessionControl, toastr, $location){
		
		var cacheSession = function(email, username, avatar){

			sessionControl.set('userIsLogin', true);
			sessionControl.set('email', email);
			sessionControl.set('username', username);
			sessionControl.set('avatar', avatar);

		};

		var unCacheSession = function(){

			sessionControl.unset('userIsLogin');
			sessionControl.unset('email');
			sessionControl.unset('username');
			sessionControl.unset('avatar');

		}


		/* Funcion para hacer la auntentificacion*/
		var login = function (loginForm) {

			/* Recibe los datos del formulario:

				1. loginForm.

			Return: Retorna una promesa:

				1. Response: Datos correcto.
				2. Error: Hubo error y/o datos incorrectos.

			*/
			$auth.login(loginForm).then(

					function (response) {
						
						if (typeof response.data != "undefined"){

							cacheSession(response.data.user.email,
									 response.data.user.name,
									loginForm.avatar
									);

							$location.path('/');

							toastr.success('Sesión iniciada con éxito', 'Mensaje');


						}
						

					},

					function (error) {
						unCacheSession();
						if (error.data.error === 'invalid_credentials'){

							toastr.error('Usuario y/o contraseña invalidos', 'Error');
							console.log(error);

						}

					}

				);

		};	 

		return {

			loginApi: function(loginForm) {

				login(loginForm);

			},

			logout: function(){
				$auth.logout();
				unCacheSession();
				toastr.success('Session Closed', 'Mensaje');
				$location.path('/login');
			},

			loginGooglePlus: function() {
				GooglePlus.login().then(
						function () {

							GooglePlus.getUser().then(function(response){

								var loginForm = {
									name: response.name,
									email: response.email,
									avatar: response.picture
								}

								login(loginForm);

							});
						}
					)
			},

			isLoggedIn: function(){
				return sessionControl.get('userIsLogin') !== null;
			}

		} 

	});
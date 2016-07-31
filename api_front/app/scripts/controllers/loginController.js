'use strict';

angular.module('apiFrontApp')
.controller('LoginCtrl', function(authUser) {
	/* Instancia de nuestro controlador*/
	var vm = this;

	/* Data */
	vm.loginForm = {
		email: 'victopin0@gmail.com',
		password: '1234'
	};

	/* Funcion que consulta al servicio
		y hace el logueo
	*/
	vm.login = function () {

		authUser.loginApi(vm.loginForm);

	}

	vm.loginGooglePlus = function() {

		authUser.loginGooglePlus();

	}


});
'use strict';

/**
 * @ngdoc function
 * @name apiFrontApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the apiFrontApp
 */
angular.module('apiFrontApp')
	.controller('AboutCtrl', function () {

		var vm = this;

		vm.menuTemplate = {
			'url': 'views/menu.html'
		}
		
	});

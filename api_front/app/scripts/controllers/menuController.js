'use strict';

angular.module('apiFrontApp')
	.controller('MenuCtrl', function(authUser, $location, $scope, sessionControl){

		var vm = this;

		vm.isLogin = authUser.isLoggedIn();

		/* Funcion que rectifica cada ves que cambie
		   isLoggedIn();
		*/
		$scope.$watch(function(){
			
			return authUser.isLoggedIn();
		
		}, function(newVal){
			
			if(typeof newVal !== 'undefined'){
				vm.isLogin = authUser.isLoggedIn();
			}

		});

		$scope.$watch(function(){
			
			return sessionControl.get('email');
		
		}, function(newVal){
			
			if(typeof newVal !== 'undefined'){
				vm.user.name = sessionControl.get('email');
			}

		});

		vm.user = {
			email: sessionControl.get('email'),
			name: sessionControl.get('username'),
			avatar: sessionControl.get('avatar')
		}

		vm.logout = function(){
			authUser.logout();
		};


		vm.isActive = function(viewLocation){
			return viewLocation === $location.path();
		}


	})
'use strict';

/**
 * @ngdoc overview
 * @name apiFrontApp
 * @description
 * # apiFrontApp
 *
 * Main module of the application.
 */
angular
  .module('apiFrontApp', [
    'authService',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'satellizer',
    'toastr',
    'googleplus'
  ])
  .config(function ($routeProvider, $authProvider, GooglePlusProvider) {

    /* Ruta por la que se hara el login */
    $authProvider.loginUrl  = 'http://api.com/auth_login';
    
    GooglePlusProvider.init({
        clientId: '409487520217-2caaj8altqtskq3sduklokaasm10h6tv.apps.googleusercontent.com',
        apiKey: '0-fygd07VG_QZcasVFGfixSK',
        scopes: ['email', 'profile']
    });

    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl',
        controllerAs: 'login'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(function($rootScope, $location, authUser, toastr){
    
    var rutasPrivadas = ['/', '/about'];

    $rootScope.$on('$routeChangeStart', function(){
        /* Validamos que la ruta este dentro de las rutasPrivadas:
  
            $location.path(): Url a la cual el usuario quiere acceder.

            rutasPrivadas: Array con todas las rutas.

        */
        if( ($.inArray ($location.path(), rutasPrivadas) !== -1 ) && !authUser.isLoggedIn() ){
            /* Si el usuario intenta ingresar a una ruta privada sin
               auntentifacion, lo retornamso al login.
            */
            toastr.error('Debe iniciar sesion para poder continuar.', 'Mensaje');
            $location.path('/login');

        }

    });

  });

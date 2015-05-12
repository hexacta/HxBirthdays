'use strict';

//Setting up route
angular.module('usuarios').config(['$stateProvider',
	function($stateProvider) {
		// Usuarios state routing
		$stateProvider.
		state('usuarios', {
			url: '/usuarios',
			templateUrl: 'modules/usuarios/views/usuarios.client.view.html'
		});
	}
]);
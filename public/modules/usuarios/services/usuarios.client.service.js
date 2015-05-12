'use strict';

//Usuarios service used for communicating with the usuarios REST endpoints
angular.module('usuarios').factory('Usuarios', ['$resource',
	function($resource) {
		return $resource('usuarios/:usuarioId', {
			usuarioId: '@_id'
		}
	);
	}	
]);
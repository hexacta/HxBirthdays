'use strict';

angular.module('usuarios').controller('UsuariosController', ['$scope', 'Usuarios',
	function($scope, Usuarios) {
  		$scope.find = function() {
			$scope.usuarios = Usuarios.query();
		};
	}
]);
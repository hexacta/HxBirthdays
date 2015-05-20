'use strict';

angular.module('users').controller('usersController', ['$scope', 'usuarios',
	function($scope, usuarios) {
  		$scope.find = function() {
			$scope.usuarios = usuarios.query();
		};
	}
]);
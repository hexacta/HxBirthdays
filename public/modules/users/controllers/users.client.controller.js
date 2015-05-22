'use strict';

angular.module('users').controller('usersController', ['$scope', 'users',
	function($scope, users) {
  		$scope.find = function() {
			$scope.users = users.query();
		};
	}
]);
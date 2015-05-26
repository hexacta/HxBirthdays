'use strict';

angular.module('users').controller('UsersController', ['$scope', 'users',
	function($scope, users) {
  		$scope.find = function() {
			$scope.users = users.query();
		};

		$scope.addFriend = function(User){
			console.log(User);
			console.log($scope.authentication);
		};
	}
]);
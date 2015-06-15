'use strict';

angular.module('users').controller('UsersController', ['$scope', 'Users', 'Authentication', '$location', 
	function($scope, Users, Authentication, $location) {
		$scope.user = Authentication.user;
		$scope.selectedFriends = [];
		$scope.friend1 = null;
		$scope.friend2 = null;
		$scope.friend3 = null;
		$scope.friend4 = null;

  		$scope.find = function() {
			$scope.users = Users.query();
		};

		$scope.isFriend = function(userSelected) {
			for (var i = $scope.user.usersFriends.length - 1; i >= 0; i--) {
				if (angular.equals(userSelected.username, $scope.user.usersFriends[i].username)) {
					return i;
				} 
			} 
			return -1;
		};

		$scope.findUser = function(displayName) {
			for (var i = $scope.users.length - 1; i >= 0; i--) {
				if (angular.equals(displayName, $scope.users[i].displayName)) {
					return $scope.users[i];
				}
			}
		};

		$scope.addFriends = function() {
			if ($scope.friend1 !== null) { 
				$scope.selectedFriends.push($scope.findUser($scope.friend1));
			}
			if ($scope.friend2 !== null) {
				$scope.selectedFriends.push($scope.findUser($scope.friend2));
			}
			if ($scope.friend3 !== null) {
				$scope.selectedFriends.push($scope.findUser($scope.friend3));
			}
			if ($scope.friend4 !== null) {
				$scope.selectedFriends.push($scope.findUser($scope.friend4));
			}
		};

		$scope.cleanInputs = function() {
			$scope.friend1 = null;
			$scope.friend2 = null;
			$scope.friend3 = null;
			$scope.friend4 = null;
		};


		$scope.upgradeUser = function() {
			var user = new Users($scope.user);
			$scope.addFriends();
			for (var i = $scope.selectedFriends.length - 1; i >= 0; i--) {
				if ($scope.isFriend($scope.selectedFriends[i]) < 0) {
					user.usersFriends.push({'username': $scope.selectedFriends[i].username, 
						                    'displayName': $scope.selectedFriends[i].displayName});			
				} else {
					$scope.error = 'Algunos de los que seleccionaste ya son tus amigos :-/';
				}
			} 
			user.$update(function() {
				$location.path('/settings/profile');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
			$scope.cleanInputs();
		};

		$scope.removeFriend = function(username) {
			var loginUser = new Users($scope.user);
			for (var i = loginUser.usersFriends.length - 1; i >= 0; i--) {
				if (angular.equals(loginUser.usersFriends[i].username, username)) {
					loginUser.usersFriends.splice(i, 1);	
				}
			} 
			loginUser.$update(function() {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};	
	}
]);
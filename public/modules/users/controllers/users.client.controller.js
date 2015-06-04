'use strict';

angular.module('users').controller('UsersController', ['$scope', 'Users', 'Authentication', '$location',
	function($scope, Users, Authentication, $location) {
		$scope.user = Authentication.user;
		$scope.selectedFriends = [];

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

		$scope.isFriendSelected = function(userSelected) {
			for (var i = $scope.selectedFriends.length - 1; i >= 0; i--) {
				if (angular.equals(userSelected.username, $scope.selectedFriends[i].username)) {
					return i;
				} 
			} 
			return -1;
		};

		$scope.addRemoveFriendList = function(userSelected, check) {
			var isFriendSelected = $scope.isFriendSelected(userSelected);
			// Si ya esta en la lista y no está chequeado -> lo quiero borrar
			if (isFriendSelected >= 0 && check) {
				$scope.selectedFriends.splice(isFriendSelected, 1);			
			} else {				
				$scope.selectedFriends.push(userSelected);
			}
		}; 

		$scope.upgradeUser = function() {
			var user = new Users($scope.user);
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
		};

		$scope.removeFriend = function(username) {
			var loginUser = new Users($scope.user);
			for (var i = loginUser.usersFriends.length - 1; i >= 0; i--) {
				if (angular.equals(loginUser.usersFriends[i].username, username)) {
					loginUser.usersFriends.splice(i, 1);	
				}
			} 
			loginUser.$update(function() {
				$location.path('/settings/profile');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};	
	}
]);
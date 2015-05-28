'use strict';

angular.module('users').controller('UsersController', ['$scope', 'Users', 'Authentication', '$location',
	function($scope, Users, Authentication, $location) {
		$scope.user = Authentication.user;
		$scope.friends = [];
		$scope.checkboxModel = false;

  		$scope.find = function() {
			$scope.users = Users.query();
		};

		$scope.addRemoveFriend = function(user){
			
			$scope.friends.push({'username': user});
			console.log($scope.friends);
			/*if (checkboxModel) {
			} else {
				$scope.items.splice(index, 1);
				$scope.friends.pop({'username': user});				
			}*/
		};

		$scope.upgradeUser = function(){
			var loginUser = new Users($scope.user);
			loginUser.usersFriends.push($scope.friends);

			console.log(loginUser);
			loginUser.$update(function() {
				$location.path('/home');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
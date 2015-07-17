'use strict';

// Birthday Fund controller 
angular.module('birthdayFunds').controller('BirthdayFundController', ['$http','$scope', '$stateParams', '$location', 'Authentication', 'BirthdayFunds', 'BirthdayFundBegin', 'BirthdayFundEdit', 'CollectableUsers', 'Users',
	function($http, $scope, $stateParams, $location, Authentication, BirthdayFunds, BirthdayFundBegin, BirthdayFundEdit, CollectableUsers, Users) {
		$scope.authentication = Authentication;
		$scope.giver = null;


		// Update existing BirthdayFund
		$scope.update = function() {
			var birthdayFund = $scope.birthdayFund;

			if (birthdayFund.usersCollecting.length < 3) {
				console.log('Somos menos de 3 -> agregamos');
				birthdayFund.usersCollecting.push({'name':$scope.authentication.user.firstName});	

				console.log(birthdayFund.usersCollecting);	

				birthdayFund.$update(function() {
					$location.path('/home');
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			} else {
				$scope.error = 'Ups... ya somos 3 juntando :-/';					
			}
		};

		// Find a list of BirthdayFund
		$scope.find = function() {
			$scope.birthdayFunds = BirthdayFunds.query();
		};

		// Find existing BirthdayFund
		$scope.findOne = function() {
			$scope.birthdayFunds = BirthdayFunds.get({ 
				birthdayFundId: $stateParams.birthdayFundId
			});
		};

		$scope.beginFund = function() {
			$scope.birthdayFund = BirthdayFundBegin.get({ 
				birthdayFundId: $stateParams.birthdayFundId
			},function (data){
				$scope.usersEnabledToCollect = CollectableUsers.query({ 
					birthdayUser: data.username
				});
				$scope.firstSelected = $scope.usersEnabledToCollect[1];
				$scope.secondSelected = $scope.usersEnabledToCollect[1];
			});
			$scope.users = Users.query();
		};

		$scope.editFund = function() {
			$scope.birthdayFund = BirthdayFundEdit.get({
				birthdayFundId: $stateParams.birthdayFundId
			});
			$scope.users = Users.query();
			console.log($scope.birthdayFund);
		};

		$scope.upgradeBirthday = function(){

			var birthdayFund = $scope.birthdayFund;

			birthdayFund.state = 'Active';
			birthdayFund.usersCollecting.push({'name': $scope.authentication.user.username});

			// Se cargan los usuarios y montos de los mismos tomados del scope

			birthdayFund.$update(function() {
				$location.path('/home');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.findUser = function(displayName) {
			for (var i = $scope.users.length - 1; i >= 0; i--) {
				if (angular.equals(displayName, $scope.users[i].displayName)) {
					return $scope.users[i];
				}
			}
		};

		$scope.addGivers = function() {			
			var newGiver = $scope.findUser($scope.giver);

			var birthdayFund = $scope.birthdayFund;
			birthdayFund.usersGivers.push({'displayName': newGiver.displayName, 
						                   'username': newGiver.username, 
						                   'amount': $scope.giverAmount});
			
			birthdayFund.$update(function() {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
				console.log(errorResponse.data);
			});

		};

		$scope.removeGiver = function(username) {
			var birthdayFund = $scope.birthdayFund;
			for (var i = birthdayFund.usersGivers.length - 1; i >= 0; i--) {
				if (angular.equals(birthdayFund.usersGivers[i].username, username)) {
					birthdayFund.usersGivers.splice(i, 1);	
				}
			} 
			birthdayFund.$update(function() {
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.addFirstSelected = function(dato) {
	        console.log('cambios de dato 1 !!!: ' + dato);
	        $scope.primerUsuarioAgregado = dato;
	    };

	    $scope.addSecondSelected = function(dato) {
	        console.log('cambios de dato 2 !!!: ' + dato);
	        $scope.segundoUsuarioAgregado = dato;
	    };

		$scope.calculateTotalAmount = function(givers) {
			var total = 0;
			for (var i = givers.length - 1; i >= 0; i--) {
				total += givers[i].amount;
			}
			return total;
		}; 
	}
]).filter('filterState', function(){
	return function(input, stateParam){
		var res = [];

		angular.forEach(input, function(elem){
			if(elem.state === stateParam){
				res.push(elem);
			}

		});

		return res;
	};
});
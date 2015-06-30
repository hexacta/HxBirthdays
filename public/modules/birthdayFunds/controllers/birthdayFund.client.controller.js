'use strict';

// Birthday Fund controller 
angular.module('birthdayFunds').controller('BirthdayFundController', ['$scope', '$stateParams', '$location', 'Authentication', 'BirthdayFunds', 'BirthdayFundBegin', 'CollectableUsers', 
	function($scope, $stateParams, $location, Authentication, BirthdayFunds, BirthdayFundBegin, CollectableUsers) {
		$scope.authentication = Authentication;

		// Update existing BirthdayFund
		$scope.update = function(birthdayFund) {
		
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

		$scope.addFirstSelected = function(dato) {
	        console.log('cambios de dato 1 !!!: ' + dato);
	        $scope.primerUsuarioAgregado = dato;
	    };

	    $scope.addSecondSelected = function(dato) {
	        console.log('cambios de dato 2 !!!: ' + dato);
	        $scope.segundoUsuarioAgregado = dato;
	    };

	    $scope.calculateTotalAmount = function(givers) {
			return givers.reduce(function(a, b){ return a.amount + b.amount;});
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
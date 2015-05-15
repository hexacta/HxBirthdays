'use strict';

// Birthday Fund controller
angular.module('birthdayFunds').controller('BirthdayFundController', ['$scope', '$stateParams', '$location', 'Authentication', 'BirthdayFunds',
	function($scope, $stateParams, $location, Authentication, BirthdayFunds) {
		$scope.authentication = Authentication;

		// Update existing BirthdayFund
		$scope.update = function() {
			var birthdayFund = $scope.birthdayFund;

			birthdayFund.$update(function() {
				$location.path('birthdayFunds/' + birthdayFund._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		$scope.addCollector = function(birthdayFund){
			// Pueden juntar hasta 3 personas
			if (birthdayFund.usersCollecting.length < 3) {
				console.log('Somos menos de 3 -> agregamos');	
				birthdayFund.usersCollecting.push($scope.authentication.user.firstName);	
				$scope.birthdayFund = birthdayFund;		
				$scope.update();			
			} else {
				console.log('Ups... ya somos 3 juntando :-/');					
			}
		};

		// Find a list of Cumpleanios
		$scope.find = function() {
			$scope.birthdayFunds = BirthdayFunds.query();
		};

		// Find existing Cumpleanio
		$scope.findOne = function() {
			$scope.birthdayFunds = BirthdayFunds.get({ 
				birthdayFundId: $stateParams.birthdayFundId
			});
		};
	}
]);
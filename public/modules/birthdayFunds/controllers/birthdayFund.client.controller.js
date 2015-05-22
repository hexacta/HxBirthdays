'use strict';

// Birthday Fund controller 
angular.module('birthdayFunds').controller('BirthdayFundController', ['$scope', '$stateParams', '$location', 'Authentication', 'BirthdayFunds', 'BirthdayFundBegin', 
	function($scope, $stateParams, $location, Authentication, BirthdayFunds, BirthdayFundBegin) {
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
			});
			
		};

		$scope.upgradeBirthday = function(){

			var birthdayFund = $scope.birthdayFund;

			birthdayFund.state = 'Active';
			birthdayFund.usersCollecting.push({'name': $scope.authentication.user.username});

			birthdayFund.$update(function() {
				$location.path('/home');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

	}
]).filter('filterState', function(){
	return function(input, stateParam){
		var res = [];

		angular.forEach(input, function(elem){
			if(elem.state === stateParam)
				res.push(elem);

		});

		return res;
	};
});
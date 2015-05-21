'use strict';

// Birthday Fund controller 
angular.module('birthdayFunds').controller('BirthdayFundController', ['$scope', '$stateParams', '$location', 'Authentication', 'BirthdayFunds',
	function($scope, $stateParams, $location, Authentication, BirthdayFunds) {
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

			$scope.birthdayFund = {username:'vdilena', firstname: 'Victor Di Lena', lastname: 'Di Lena', birthday: new Date('1981/01/16'), limit_date_fund: new Date('1981/01/16')};
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
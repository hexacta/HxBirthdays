'use strict';

//Setting up route
angular.module('birthdayFunds').config(['$stateProvider',
	function($stateProvider) {
		// Birthday Fund state routing
		$stateProvider.
		state('listBirthdayFund', {
			url: '/birthdayFunds',
			templateUrl: 'modules/birthdayFund/views/list-birthdayFund.client.view.html'
		});

		$stateProvider.
		state('updateBirthdayFund', {
			url: '/birthdayFunds/update',
			templateUrl: 'modules/birthdayFund/views/list-birthdayFund.client.view.html'
		});

	}
]);
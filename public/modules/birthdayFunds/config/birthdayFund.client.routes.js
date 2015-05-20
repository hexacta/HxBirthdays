'use strict';

//Setting up route
angular.module('birthdayFunds').config(['$stateProvider',
	function($stateProvider) {
		// Birthday Fund state routing
		$stateProvider.
		state('listBirthdayFund', {
			url: '/birthdayFunds',
			templateUrl: 'modules/core/views/home.client.view.html'
		}).state('createbirthdayFund', {
			url: '/create_birthdayFunds',
			templateUrl: 'modules/birthdayFunds/views/create-birthdayFund.client.view.html'
		});
	}
]);
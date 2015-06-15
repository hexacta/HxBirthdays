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
			url: '/createBirthdayFunds/:birthdayFundId/create',
			templateUrl: 'modules/birthdayFunds/views/create-birthdayFund.client.view.html'
		}).state('editBirthdayFund', {
			url: '/editBirthdayFund/:birthdayFundId/edit',
			templateUrl: 'modules/birthdayFunds/views/edit-birthdayFund.client.view.html'
		});
	}
]);
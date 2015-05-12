'use strict';

//Setting up route
angular.module('cumpleanios').config(['$stateProvider',
	function($stateProvider) {
		// Cumpleanios state routing
		$stateProvider.
		state('listCumpleanios', {
			url: '/cumpleanios',
			templateUrl: 'modules/cumpleanios/views/list-cumpleanios.client.view.html'
		}).
		state('createCumpleanio', {
			url: '/cumpleanios/create',
			templateUrl: 'modules/cumpleanios/views/create-cumpleanio.client.view.html'
		}).
		state('viewCumpleanio', {
			url: '/cumpleanios/:cumpleanioId',
			templateUrl: 'modules/cumpleanios/views/view-cumpleanio.client.view.html'
		}).
		state('editCumpleanio', {
			url: '/cumpleanios/:cumpleanioId/edit',
			templateUrl: 'modules/cumpleanios/views/edit-cumpleanio.client.view.html'
		});
	}
]);
'use strict';

//Setting up route
angular.module('templatemails').config(['$stateProvider',
	function($stateProvider) {
		// Templatemails state routing
		$stateProvider.
		state('listTemplatemails', {
			url: '/templatemails',
			templateUrl: 'modules/templatemails/views/list-templatemails.client.view.html'
		}).
		state('createTemplatemail', {
			url: '/templatemails/create',
			templateUrl: 'modules/templatemails/views/create-templatemail.client.view.html'
		}).
		state('viewTemplatemail', {
			url: '/templatemails/:templatemailId',
			templateUrl: 'modules/templatemails/views/view-templatemail.client.view.html'
		}).
		state('editTemplatemail', {
			url: '/templatemails/:templatemailId/edit',
			templateUrl: 'modules/templatemails/views/edit-templatemail.client.view.html'
		});
	}
]);
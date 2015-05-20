'use strict';

//Birthday Fund service used to communicate Birthday Fund REST endpoints
angular.module('birthdayFunds').factory('BirthdayFunds', ['$resource',
	function($resource) {

		return $resource('birthdayFunds/:birthdayFundId', { birthdayFundId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
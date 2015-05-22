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
]).factory('BirthdayFundBegin', ['$resource',
	function($resource) {

		return $resource('createBirthdayFunds/:birthdayFundId', { birthdayFundId: '@id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
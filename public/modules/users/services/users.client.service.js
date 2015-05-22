'use strict';

//Users service used for communicating with the users REST endpoints
angular.module('users').factory('users', ['$resource',
	function($resource) {
		return $resource('users/:userId', {
			userId: '@id'
		}
	);
	}	
]);
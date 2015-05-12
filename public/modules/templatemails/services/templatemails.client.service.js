'use strict';

//Templatemails service used to communicate Templatemails REST endpoints
angular.module('templatemails').factory('Templatemails', ['$resource',
	function($resource) {
		return $resource('templatemails/:templatemailId', { templatemailId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
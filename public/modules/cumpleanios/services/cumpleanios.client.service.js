'use strict';

//Cumpleanios service used to communicate Cumpleanios REST endpoints
angular.module('cumpleanios').factory('Cumpleanios', ['$resource',
	function($resource) {
		return $resource('cumpleanios/:cumpleanioId', { cumpleanioId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
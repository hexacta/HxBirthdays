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
])
// Defino el servicio para obtener los cumpleaños no colectados
.factory('CumpleaniosNoColectados', ['$resource',
	function($resource) {

		return $resource('cumpleanios-no-colectados/:cumpleanioId', { cumpleanioId: '@id'
		}, {
			chargeInBirthdayCollectedList: {
				method: 'PUT'
			}
		});
	}
]);
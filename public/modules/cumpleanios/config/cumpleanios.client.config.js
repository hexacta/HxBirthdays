'use strict';

// Configuring the Articles module
angular.module('cumpleanios').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Cumpleaños', 'cumpleanios', 'dropdown', '/cumpleanios(/create)?');
		Menus.addSubMenuItem('topbar', 'cumpleanios', 'Lista de Cumpleaños', 'cumpleanios');
		Menus.addSubMenuItem('topbar', 'cumpleanios', 'Nuevo Cumpleaño', 'cumpleanios/create');
		Menus.addSubMenuItem('topbar', 'cumpleanios', 'Para estos no se junta todavia', 'cumplanios-no-colectados');
	}
]);
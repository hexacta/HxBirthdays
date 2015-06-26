'use strict';

// Configuring the Articles module
angular.module('cumpleanios').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Cumplea&ntilde;os', 'cumpleanios', 'dropdown', '/cumpleanios(/create)?');
		Menus.addSubMenuItem('topbar', 'cumpleanios', 'Lista de Cumplea&ntilde;os', 'cumpleanios');
		Menus.addSubMenuItem('topbar', 'cumpleanios', 'Nuevo Cumplea&ntilde;o', 'cumpleanios/create');
		Menus.addSubMenuItem('topbar', 'cumpleanios', 'Para estos no se junta todav&iacute;a', 'cumplanios-no-colectados');
	}
]);
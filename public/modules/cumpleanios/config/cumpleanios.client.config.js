'use strict';

// Configuring the Articles module
angular.module('cumpleanios').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Cumplea\u00f1os', 'cumpleanios', 'dropdown', '/cumpleanios(/create)?');
		Menus.addSubMenuItem('topbar', 'cumpleanios', 'Lista de Cumplea\u00f1os', 'cumpleanios');
		Menus.addSubMenuItem('topbar', 'cumpleanios', 'Nuevo Cumplea\u00f1o', 'cumpleanios/create');
		Menus.addSubMenuItem('topbar', 'cumpleanios', 'Para estos no se junta todav\u00eda', 'cumplanios-no-colectados');
	}
]);
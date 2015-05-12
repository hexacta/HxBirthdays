'use strict';

// Configuring the Articles module
angular.module('cumpleanios').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Cumpleanios', 'cumpleanios', 'dropdown', '/cumpleanios(/create)?');
		Menus.addSubMenuItem('topbar', 'cumpleanios', 'List Cumpleanios', 'cumpleanios');
		Menus.addSubMenuItem('topbar', 'cumpleanios', 'New Cumpleanio', 'cumpleanios/create');
	}
]);
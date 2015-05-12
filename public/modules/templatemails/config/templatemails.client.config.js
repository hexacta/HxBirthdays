'use strict';

// Configuring the Articles module
angular.module('templatemails').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Templatemails', 'templatemails', 'dropdown', '/templatemails(/create)?');
		Menus.addSubMenuItem('topbar', 'templatemails', 'List Templatemails', 'templatemails');
		Menus.addSubMenuItem('topbar', 'templatemails', 'New Templatemail', 'templatemails/create');
	}
]);
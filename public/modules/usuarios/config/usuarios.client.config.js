'use strict';

// Configuring the Usuarios module
angular.module('usuarios').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'usuarios', 'Lista de Usuarios', 'usuarios');
	}
]);
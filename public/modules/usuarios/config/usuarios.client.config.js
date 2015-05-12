'use strict';

// Configuring the Usuarios module
angular.module('usuarios').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addSubMenuItem('topbar', 'usuarios', 'Lista de Usuarios', 'usuarios');
	}
]);
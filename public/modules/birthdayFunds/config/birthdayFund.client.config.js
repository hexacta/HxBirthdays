'use strict';

// Birthday funds module config
angular.module('birthdayFunds').run(['Menus',
	function(Menus) {
		// Config logic
		Menus.addMenuItem('topbar', 'Nueva Colecta', 'create_birthdayFunds', '', 'create_birthdayFunds');
	}
]);
'use strict';

// Birthday funds module config
angular.module('birthdayFunds').run(['Menus',
	function(Menus) {
		// Config logic
		Menus.addMenuItem('topbar', 'Nueva Colecta', 'createBirthdayFunds/1/create', '', 'createBirthdayFunds/1/create');
	}
]);
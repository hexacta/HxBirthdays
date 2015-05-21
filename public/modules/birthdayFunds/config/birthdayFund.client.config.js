'use strict';

// Birthday funds module config
angular.module('birthdayFunds').run(['Menus',
	function(Menus) {
		// Config logic
		Menus.addMenuItem('topbar', 'Nueva Colecta', 'createBirthdayFunds', '', 'createBirthdayFunds');
	}
]);
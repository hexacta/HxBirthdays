'use strict';

// Configuring the Articles module
angular.module('articles').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Articles', 'articles', 'dropdown', '/articles(/create)?');
		Menus.addSubMenuItem('topbar', 'articles', 'List Articles', 'articles');
		Menus.addSubMenuItem('topbar', 'articles', 'New Article', 'articles/create');
		Menus.addSubMenuItem('topbar', 'articles', 'Edit Article', 'articles/edit');
		Menus.addSubMenuItem('topbar', 'articles', 'Remove Article', 'articles/remove');
	}
]);
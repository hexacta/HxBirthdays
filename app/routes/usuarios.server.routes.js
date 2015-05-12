'use strict';

/**
 * Module dependencies.
 */
var usuarios = require('../../app/controllers/usuarios.server.controller');

module.exports = function(app) {
	// Usuario Routes
	app.route('/usuarios')
		.get(usuarios.list);
};
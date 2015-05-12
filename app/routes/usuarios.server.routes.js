'use strict';

/**
 * Module dependencies.
 */
var usuarios = require('../../app/controllers/usuarios.server.controller');

module.exports = function(app) {
	// Usuario Routes
	app.route('/usuarios')
		.get(usuarios.list);

	app.route('/usuarios/:usuarioId')
		.get(usuario.read);

	// Finish by binding the usuario middleware
	app.param('usuarioId', usuarios.usuarioByID);
};
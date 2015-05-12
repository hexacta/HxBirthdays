'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var cumpleanios = require('../../app/controllers/cumpleanios.server.controller');

	// Cumpleanios Routes
	app.route('/cumpleanios')
		.get(cumpleanios.list)
		.post(users.requiresLogin, cumpleanios.create);

	app.route('/cumpleanios/:cumpleanioId')
		.get(cumpleanios.read)
		.put(users.requiresLogin, cumpleanios.hasAuthorization, cumpleanios.update)
		.delete(users.requiresLogin, cumpleanios.hasAuthorization, cumpleanios.delete);

	// Finish by binding the Cumpleanio middleware
	app.param('cumpleanioId', cumpleanios.cumpleanioByID);
};

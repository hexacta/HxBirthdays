'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var cumpleanios = require('../../app/controllers/cumpleanios.server.controller');

	// Cumpleanios Routes
	app.route('/cumpleanios')
		.get(users.requiresLogin,cumpleanios.list)
		.post(users.requiresLogin, cumpleanios.create);

	app.route('/cumpleanios/:cumpleanioId')
		.get(cumpleanios.read)
		.put(users.requiresLogin, cumpleanios.hasAuthorization, cumpleanios.update)
		.delete(users.requiresLogin, cumpleanios.hasAuthorization, cumpleanios.delete);


	app.route('/cumpleanios-no-colectados')
		.get(users.requiresLogin,cumpleanios.cumpleanierosParaLosQueNoJuntan)
		.post(users.requiresLogin, cumpleanios.create);

	app.route('/cumpleanios-no-colectados/:cumpleanioId')
		.get(users.requiresLogin,cumpleanios.read)
		.put(cumpleanios.postularseParaJuntar)
		.delete(users.requiresLogin, cumpleanios.hasAuthorization, cumpleanios.delete);

	// Finish by binding the Cumpleanio middleware
	app.param('cumpleanioId', cumpleanios.cumpleanioByID);
};

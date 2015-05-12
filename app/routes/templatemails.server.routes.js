'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var templatemails = require('../../app/controllers/templatemails.server.controller');

	// Templatemails Routes
	app.route('/templatemails')
		.get(templatemails.list)
		.post(users.requiresLogin, templatemails.create);

	app.route('/templatemails/:templatemailId')
		.get(templatemails.read)
		.put(users.requiresLogin, templatemails.hasAuthorization, templatemails.update)
		.delete(users.requiresLogin, templatemails.hasAuthorization, templatemails.delete);

	// Finish by binding the Templatemail middleware
	app.param('templatemailId', templatemails.templatemailByID);
};

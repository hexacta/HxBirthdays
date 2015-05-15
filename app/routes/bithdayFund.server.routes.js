'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var birthdayFund = require('../../app/controllers/birthdayFund.server.controller');

	// birthdayFund Routes
	app.route('/birthdayFunds')
		.get(birthdayFund.list);

	app.route('/birthdayFunds/:birthdayFundId')
		.put(users.requiresLogin, birthdayFund.hasAuthorization, birthdayFund.update);
};

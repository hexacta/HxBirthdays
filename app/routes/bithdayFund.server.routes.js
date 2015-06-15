'use strict';

var birthdayFund = require('../../app/controllers/birthdayFund.server.controller'),
	users = require('../../app/controllers/users.server.controller');

module.exports = function(app) {

	// birthdayFund Routes
	app.route('/birthdayFunds')
		.get(users.requiresLogin,birthdayFund.list);

	app.route('/birthdayFunds/:birthdayFundId')
		.put(birthdayFund.update);

	app.route('/createBirthdayFunds/:birthdayFundId')
		.get(users.requiresLogin,birthdayFund.read)
		.put(birthdayFund.update);

	app.route('/usersToCollect/:birthdayUser')
		.get(users.requiresLogin,birthdayFund.users);

	app.param('birthdayFundId', birthdayFund.beginFund);
	app.param('birthdayUser', birthdayFund.users);


};
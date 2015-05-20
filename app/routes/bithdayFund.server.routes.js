'use strict';

module.exports = function(app) {
	var birthdayFund = require('../../app/controllers/birthdayFund.server.controller');

	// birthdayFund Routes
	app.route('/birthdayFunds')
		.get(birthdayFund.list);

	app.route('/birthdayFunds/:birthdayFundId')
		.put(birthdayFund.update);
};
'use strict';

var birthdayFund = require('../../app/controllers/birthdayFund.server.controller');

module.exports = function(app) {

	// birthdayFund Routes
	app.route('/birthdayFunds')
		.get(birthdayFund.list);

	app.route('/birthdayFunds/:birthdayFundId')
		.put(birthdayFund.update);

	app.route('/createBirthdayFunds/:birthdayFundId')
		.get(birthdayFund.read)
		.put(birthdayFund.update);

	app.param('birthdayFundId', birthdayFund.beginFund);

};
'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
	 User = mongoose.model('User'),
	 BirthdayFund = mongoose.model('BirthdayFund'),
	 obtenerUsuario = require('./users/users.schedule.server.controller'),
	 generateBirthdayFund = require('./birthdayFund.schedule.server.controller');
	 

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};



obtenerUsuario.registroDeUsuarios();
generateBirthdayFund.generateBirthdayFund();
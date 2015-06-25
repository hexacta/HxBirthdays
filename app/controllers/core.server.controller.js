'use strict';

/**
 * Module dependencies.
 */
 var mongoose = require('mongoose'),
	 User = mongoose.model('User'),
	 obtenerUsuario = require('./users/users.schedule.server.controller');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};



obtenerUsuario.registroDeUsuarios();

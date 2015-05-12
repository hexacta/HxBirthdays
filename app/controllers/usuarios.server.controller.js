'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Usuario = mongoose.model('Usuario'),
	_ = require('lodash');

/**
 * Lista de Usuarios
 */
exports.list = function(req, res) {
	Usuario.find().sort('-username').populate('username', 'displayName').exec(function(err, usuarios) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			var listaUsuarios = [{nombre: 'Jesica', apellido: 'Taira', email: 'jtaira@hexacta.com', username: 'jtaira', password: 'jtaira', fechaDeNacimiento: '8/6/1984'},
			{nombre: 'Victor', apellido: 'Di Lena', email: 'vdilena@hexacta.com', username: 'vdilena', password: 'vdilena', fechaDeNacimiento: '16/1/1985'},
			{nombre: 'Oscar', apellido: 'Pinto', email: 'opinto@hexacta.com', username: 'opinto', password: 'opinto', fechaDeNacimiento: '29/11/1983'}];

			res.json(listaUsuarios);
		}
	});
};
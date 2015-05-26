'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller.js'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');

var listaUsuarios = [];



//Scheduler
//var schedule = require('node-schedule');

//var j = schedule.scheduleJob('0 0 * * *', function(){ 
	//Ldap
	var ldap = require('ldapjs');

	ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;

	var client = ldap.createClient({
	  url: 'el_ldap'
	});

	
	client.bind('miusuario', 'miconstrasenia', function(err) {
	  	console.log('Conectado a LDAP!');
	});

	var opts = {
	  scope: 'one'
	};

	// Se usa distinguishedName para entrar
	client.search('el_dn', opts, function(err, res) {  
		var lista = res.on('searchEntry', function(entry) {
	 		listaUsuarios.push({nombre: entry.object.givenName, apellido: entry.object.sn, email: entry.object.mail, username: entry.object.name, password: null, fechaDeNacimiento: '8/6/1984'});
		});
	
	});




	
//});

/**
 * Lista de Usuarios
 */
exports.list = function(req, res) {
	User.find().sort('-username').exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(users);
		}
	});
};

/**
 * Update user details
 */
exports.update = function(req, res) {
	// Init Variables
	var user = req.user;
	var message = null;

	// For security measurement we remove the roles from the req.body object
	delete req.body.roles;

	if (user) {
		// Merge existing user
		user = _.extend(user, req.body);
		user.updated = Date.now();
		user.displayName = user.firstName + ' ' + user.lastName;

		user.save(function(err) {
			if (err) {
				return res.status(400).send({
					message: errorHandler.getErrorMessage(err)
				});
			} else {
				req.login(user, function(err) {
					if (err) {
						res.status(400).send(err);
					} else {
						res.json(user);
					}
				});
			}
		});
	} else {
		res.status(400).send({
			message: 'User is not signed in'
		});
	}
};

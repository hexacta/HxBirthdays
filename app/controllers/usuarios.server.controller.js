'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Usuario = mongoose.model('Usuario'),
	_ = require('lodash');

var listaUsuarios = [];

//Scheduler
var schedule = require('node-schedule');

var j = schedule.scheduleJob('0 0 * * *', function(){
    
	//Ldap
	var ldap = require('ldapjs');

	ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;

	var client = ldap.createClient({
	  url: 'el_ldap'
	});

	client.bind('miusuario', 'micontrasenia', function(err) {
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
});


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
			res.json(listaUsuarios);
		}
	});
};
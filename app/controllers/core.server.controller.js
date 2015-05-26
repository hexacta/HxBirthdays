'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	User = mongoose.model('User'),
	_ = require('lodash');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

//Scheduler create users 
var schedule = require('node-schedule');

var j = schedule.scheduleJob('0 0 * * *', function(){ 
	//Ldap
	var ldap = require('ldapjs');

	ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;

	var client = ldap.createClient({
	  url: 'la_url'
	});

	client.bind('usuario', 'clave', function(err) {
	  	console.log('Conectado a LDAP!');
	});

	var opts = {
	  scope: 'one'
	};

	// Se usa distinguishedName para entrar
	client.search('el_dn', opts, function(err, res) {  
		var lista = res.on('searchEntry', function(entry) {
			User.find().where('username').equals(entry.object.name).exec(function(err, users) {
				// Si no lo encuentro, lo agrego
				if (err) {
					var newUser = new User();
			 		newUser.firstName = entry.object.givenName;
			 		newUser.lastName = entry.object.sn;
			 		newUser.displayName = entry.object.givenName +' ' + entry.object.sn;
			 		newUser.email = entry.object.mail;
			 		newUser.username = entry.object.name;
			 		newUser.photo = 'la_foto'
			 		newUser.birthday = '8/6/1984';
			 		newUser.salt = null;
			 		newUser.password = null;
			 		newUser.usersFriends = [];

			 		newUser.save(function(err) {
						if (err) {
							console.log(err);
							return res.status(400).send({
								message: errorHandler.getErrorMessage(err)
							});
						} else {
							res.json(newUser);
						}
					});	
				}
			});
		});
	});
});

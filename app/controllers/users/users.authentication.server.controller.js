'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	ldap = require('ldapjs'),
	fs = require('fs');

var theLDAPUrl;
var params = {};

// Lectura de archivo
var fileData = fs.readFileSync('LDAP/ldap_params.txt', 'utf8');
var fileLines = fileData.split('\r\n');

for (var x in fileLines){
	var fileLine = fileLines[x].split('|');
	params[fileLine[0]] = fileLine[1];
}
theLDAPUrl = params.url;

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {

	var client = ldap.createClient({
		      url: theLDAPUrl
	});

	client.bind(String(req.body.username) + '@hexacta.com', String(req.body.password), function(err) {
		if(!err){			
			User.findOne().where('username').equals(req.body.username).exec(function(err, usuario) {
				if (!err) {
					req.login(usuario, function(err) {
						if (err) {
							res.status(400).send(err);
						} else {
							res.json(usuario);
						}	
					});
				}
			});
		} else {
			res.status(400).send({message: 'Usuario o Clave Incorrecta'});
		}
	});
};
	

/**
 * Signout
 */
exports.signout = function(req, res) {

	req.logout();

	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});

	res.redirect('/');
};
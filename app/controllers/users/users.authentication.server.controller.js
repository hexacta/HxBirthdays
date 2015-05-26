'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User'),
	ldap = require('ldapjs');


/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {

	var client = ldap.createClient({
		      url: 'el_ldap'
	});

	client.bind(String(req.body.username) + '@hexacta.com', String(req.body.password), function(err) {
		if(!err){
		  	passport.authenticate('local', function(err, user, info) {
				if (err || !user) {
					res.status(400).send(info);
				} else {
					// Remove sensitive data before login
					user.password = undefined;
					user.salt = undefined;
					req.login(user, function(err) {
						if (err) {
							res.status(400).send(err);
						} else {
							res.json(user);
						}	
					});
				}
			})(req, res, next);
		}
		else {
			console.log('Usuario o clave incorrecta');
			res.status(400).send('Usuario o clave incorrecta');
		}
	});
};
	

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	res.redirect('/');
};
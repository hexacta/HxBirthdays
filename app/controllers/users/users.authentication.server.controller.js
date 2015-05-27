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
// Lectura de archivo
theLDAPUrl = params.url;

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {

	//User.remove().exec();

	var client = ldap.createClient({
		      url: theLDAPUrl
	});

	client.bind(String(req.body.username) + '@hexacta.com', String(req.body.password), function(err) {
		if(!err){			
			var	user = new User();
			user.username = req.body.username;
			user.password = req.body.password;
			req.login(user, function(err) {
				if (err) {
					res.status(400).send(err);
				} else {
					res.json(user);
				}	
			});
		} else {
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
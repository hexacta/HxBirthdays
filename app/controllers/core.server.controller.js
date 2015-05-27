'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	User = mongoose.model('User'),
	_ = require('lodash'),
	fs = require('fs');

exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		request: req
	});
};

// Lectura de archivo
var theLDAPUrl;
var user;
var pass;
var dn;
var params = {};

// Lectura de archivo
/*
* TODO: Meter esto en un servicio.
*/
var fileData = fs.readFileSync('LDAP/ldap_params.txt', 'utf8');
var fileLines = fileData.split('\r\n');

for (var x in fileLines){
	var fileLine = fileLines[x].split('|');
	params[fileLine[0]] = fileLine[1];
}
// Lectura de archivo

theLDAPUrl = params.url;
user = params.user;
pass = params.pass;
dn = params.dn_bs + ',' + params.dn;

//Scheduler create users 
var schedule = require('node-schedule');

var j = schedule.scheduleJob('0 0 * * *', function(){

//Ldap
var ldap = require('ldapjs');

ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;


	var client = ldap.createClient({
	  url: theLDAPUrl
	});

	client.bind(user, pass, function(err) {
	  	console.log('Conectado a LDAP!');
	});

	var opts = {
	  scope: 'one'
	};

	// Se usa distinguishedName para entrar
	client.search(dn, opts, function(err, res) {
		var lista = res.on('searchEntry', function(entry) {

			User.findOne().where('username').equals(entry.object.name).exec(function(err, users) {
				// Si no lo encuentro, lo agrego
				if (!users) {
					var newUser = new User();
			 		newUser.firstName = entry.object.givenName;
			 		newUser.lastName = entry.object.sn;
			 		newUser.displayName = entry.object.givenName +' ' + entry.object.sn;
			 		newUser.email = entry.object.mail;
			 		newUser.username = entry.object.name;
			 		newUser.birthday = '8/6/1984';
			 		newUser.salt = null;
			 		newUser.password = null;
			 		newUser.usersFriends = [];

			 		newUser.save();
				}
			});
		});
	});
});

'use strict';

var lector = require('../users.lectorLDAP.server.controller'),
	ldap = require('ldapjs'),
	mongoose = require('mongoose'),
	User = mongoose.model('User');


exports.loginLDAP = function(req,res){
	lector.lectorArchivo();
	console.log('*************************************************'+lector.getURL());
	var client = ldap.createClient({
		      url: lector.getURL()
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

	return res;
	};
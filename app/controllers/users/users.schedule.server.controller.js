'use strict';
//Scheduler create users 
var schedule = require('node-schedule');
var ldap = require('ldapjs');
var lector = require('../users.lectorLDAP.server.controller');
var mongoose = require('mongoose'),
	 User = mongoose.model('User');

function buscarUsuarios(opts,client){
	lector.lectorArchivo();
	client.search(lector.getDN(), opts, function(err, res) {
	var lista = res.on('searchEntry', function(entry) {
			User.findOne().where('username').equals(entry.object.name).exec(function(err, users){
			if (!users) {
				var newUser = new User({
					firstName: entry.object.givenName,
					lastName: entry.object.sn,
					displayName: entry.object.givenName +' ' + entry.object.sn,
					email: entry.object.mail,
					username: entry.object.name,
					birthday: '8/6/1984',
					usersFriends : []
					});
				newUser.save();
				}
			});	
		});
	});
}



function obtenerUsuario(){
	lector.lectorArchivo();
	ldap.Attribute.settings.guid_format = ldap.GUID_FORMAT_B;	
	var client = ldap.createClient({
	  url: lector.getURL()
	});


	client.bind(lector.getUser(), lector.getPass(), function(err) {
	  	console.log('Conectado a LDAP!');
	});
	var opts = {
	  scope: 'one'
	};
	buscarUsuarios(opts, client);
}

exports.registroDeUsuarios = function(){
	schedule.scheduleJob('0 0 * * *', obtenerUsuario());
};


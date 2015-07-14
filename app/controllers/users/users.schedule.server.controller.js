'use strict';
//Scheduler create users 
var schedule = require('node-schedule');
var mongoose = require('mongoose'),
	User = mongoose.model('User');
var request = require('request');	 

//Generacion con LDAP
/*function generarUsuarios(opts,client){
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
}*/


function generarUsuario() {
	process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
	request('https://hrs.hexacta.com/hrs-intranet/services/employees/all', function (error, response, body) {
	  if (!error && response.statusCode === 200) {
	  	var jsonObject = JSON.parse(body);
	  	jsonObject.forEach(function(obj) {
	  		User.findOne().where('username').equals(obj.username).exec(function(err, user){
				if (!user) {
					var newUser = new User({
						firstName: obj.firstName,
						lastName: obj.lastName,
						displayName: obj.firstName +' ' + obj.lastName,
						email: obj.username+'@hexacta.com',
						username: obj.username,
						birthday: obj.dateOfBirth,
						usersFriends : []
						});
					newUser.save();
					console.log('Se creo el usuario: ' + obj.username);
				}
			});
		});
	   }
	if(error) {
  		console.log(error);
  	}
	});
}



exports.registroDeUsuarios = function(){
	//User.remove().exec();
	//schedule.scheduleJob('0 0 * * *', generarUsuario());
};


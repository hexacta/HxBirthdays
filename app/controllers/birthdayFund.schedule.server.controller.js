'use strict';
//Scheduler create users 
var schedule = require('node-schedule');
var mongoose = require('mongoose'),
	 BirthdayFund = mongoose.model('BirthdayFund'),
	 User = mongoose.model('User'),
	 usersProfileController = require('./users/users.profile.server.controller');


function isABirthdayPerson(user) {
	var today = new Date();
	//Realizar la evaluacion que se considere correcta para generar las colectas con este proceso automatico.
	if (user.birthday.getMonth() === today.getMonth()) {
		console.log('>>>> ' + user.firstName + ' ' + user.lastName + ' Cumple este Mes');
		return true;
	}
	else {
		return false;
	}
}

function checkBirthdayAndBuild(user) {
	var newBirthdayFund;
	if(isABirthdayPerson(user)) {
		newBirthdayFund = new BirthdayFund();
		newBirthdayFund.firstname = user.firstName;
		newBirthdayFund.lastname = user.lastName;
		newBirthdayFund.username = user.username;
		newBirthdayFund.birthday = user.birthday;
		newBirthdayFund.state = 'InActive';
		newBirthdayFund.save();
	}
}

function generate() {
	console.log('**********Generate Colecta*******');
	User.find().exec(function(err, users) {
		if (err) {
			console.log(err);
		} else {
			users.forEach(function(user) {
				checkBirthdayAndBuild(user);
			});
		}
	});
}


exports.generateBirthdayFund = function(){
	//schedule.scheduleJob('* * * * *', generate());
};	 
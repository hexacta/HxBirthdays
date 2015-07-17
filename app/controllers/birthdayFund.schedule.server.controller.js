'use strict';
//Scheduler create users 
var schedule = require('node-schedule');
var mongoose = require('mongoose'),
	 BirthdayFund = mongoose.model('BirthdayFund'),
	 User = mongoose.model('User'),
	 usersProfileController = require('./users/users.profile.server.controller');


function resetNonBirthdayDateValues(dateToReset) {
	dateToReset.setFullYear(2000);
	dateToReset.setHours(0);
	dateToReset.setMinutes(0);
	dateToReset.setSeconds(0);
	dateToReset.setMilliseconds(0);
	return dateToReset;
}
function compareBirthdayDatesWithToday(dateToCompare) {
	var todayTimestamp = resetNonBirthdayDateValues(new Date()).getTime();
	var dateToCompareTimestamp =
	    resetNonBirthdayDateValues(dateToCompare).getTime();
	    console.log('++++++Diferencia: ' + (todayTimestamp - dateToCompareTimestamp));
	return (todayTimestamp - dateToCompareTimestamp);
}

function isABirthdayPerson(user) {
	var birthday = new Date(user.birthday);
	console.log('Cumpleaños copiado: ' + birthday);
	//2592000000 ms = 30 dias que es la ventana que consideramos para crear una colecta inactiva de un proximo cumpleañero.
	if (compareBirthdayDatesWithToday(birthday) <= 2592000000)  {
		return true;
	}
	else {
		return false;
	}
}

function checkBirthdayAndBuild(user) {
	var newBirthdayFund;
	if(isABirthdayPerson(user)) {
		console.log('>>>>>> ' + user.firstName + ' ' + user.lastName + ' ' + user.birthday + ' Cumple este Mes');
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
	generate();
	//schedule('* * * * *', generate());
};	 
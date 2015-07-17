'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Templatemail = mongoose.model('Templatemail'),
	_ = require('lodash'),
	User = mongoose.model('User');



/**
 * Create a Templatemail
 */
exports.create = function(req, res) {
	var templatemail = new Templatemail(req.body);
	templatemail.user = req.user;

	templatemail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(templatemail);
		}
	});
};

/**
 * Show the current Templatemail
 */
exports.read = function(req, res) {
	res.jsonp(req.templatemail);
};

/**
 * Update a Templatemail
 */
exports.update = function(req, res) {
	var templatemail = req.templatemail ;

	templatemail = _.extend(templatemail , req.body);

	templatemail.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(templatemail);
		}
	});
};

/**
 * Delete an Templatemail
 */
exports.delete = function(req, res) {
	var templatemail = req.templatemail ;

	templatemail.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(templatemail);
		}
	});
};

/**
 * List of Templatemails
 */
exports.list = function(req, res) { 
	Templatemail.find().sort('-created').populate('user', 'displayName').exec(function(err, templatemails) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(templatemails);
		}
	});
};

/**
 * Templatemail middleware
 */
exports.templatemailByID = function(req, res, next, id) { 
	Templatemail.findById(id).populate('user', 'displayName').exec(function(err, templatemail) {
		if (err) {
			return next(err);
		}
		if (! templatemail){
			return next(new Error('Failed to load Templatemail ' + id));
		}
		req.templatemail = templatemail ;
		next();
	});
};

/**
 * Templatemail authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.templatemail.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

var schedule = require('node-schedule');

/* Funcion mockeada que devuelve a todos los usuarios. */
function getUsersData() {
	console.log('*********PASE POR EL SCHEDULER 5**************');
	return [{'firstname':'Nahuel','lastname':'Schlegel','birthday':new Date('03/06/1991'), 'username':'nschlegel'},
            {'firstname':'Victor','lastname':'Di Lena','birthday':new Date('07/06/1991'), 'username':'vdilena'},
            {'firstname':'Mauro','lastname':'Gonzalez','birthday':new Date('07/07/1991'), 'username':'mgonzalez'},
            {'firstname':'Eugenia','lastname':'Bertinotti','birthday':new Date('07/24/1991'), 'username':'ebertinotti'},
            {'firstname':'Oscar','lastname':'Pinto','birthday':new Date('07/26/1991'), 'username':'opinto'},
            {'firstname':'Matias','lastname':'Rios','birthday':new Date('07/26/1991'), 'username':'mrios'},
            {'firstname':'Jesica','lastname':'Taira','birthday':new Date('07/26/1991'), 'username':'jtaira'},
            {'firstname':'Pablo','lastname':'Morixe','birthday':new Date('08/31/1991'), 'username':'pmorixe'}];
}

/* Funcion mockeada que devuelve la cantidad de dias de anterioridad con los
 * que se mandaran los mails de un cumpleanios. */
function getDaysToSoonBirthdays() {
	return 14;
}

/* Resetea aquellos valores de la fecha que no tienen sentido para definir un
 * cumpleanios: Anios, horas, minutos, segundos y milisegundos. */
function resetNonBirthdayDateValues(dateToReset) {
	dateToReset.setFullYear(2000);
	dateToReset.setHours(0);
	dateToReset.setMinutes(0);
	dateToReset.setSeconds(0);
	dateToReset.setMilliseconds(0);
	return dateToReset;
}


/* Compara una fecha de cumpleanios con la fecha del dia. Para ambas ignora los
 * valores de la fecha que no tienen sentido para definir un cumpleanios:
  * Anios, horas, minutos, segundos y milisegundos. */
function compareBirthdayDatesWithToday(dateToCompare) {
	var todayTimestamp = resetNonBirthdayDateValues(new Date()).getTime();
	var dateToCompareTimestamp =
	    resetNonBirthdayDateValues(dateToCompare).getTime();
	return (dateToCompareTimestamp - todayTimestamp);
}

/* Devuelve la lista de las personas cuyo cumpleaños es dentro de una cantidad
 * de dias determinada. */
function getUsersWithSoonBirthdays() {
	var daysToBirhdayInMiliseconds = getDaysToSoonBirthdays() *
	    24 * 60 * 60 * 1000;
	var usersWithSoonBirthdays = [];
	var users = getUsersData();
	var i = 0;
	while (users[i]) {
		if (compareBirthdayDatesWithToday(users[i].birthday) ===
			daysToBirhdayInMiliseconds) {
			usersWithSoonBirthdays.push(users[i]);
	    }		
		i++;
	}
	return usersWithSoonBirthdays;
}


function getUsersWithThisFriend(usernameToSearch) {
    User.findOne().where('username').equals(usernameToSearch).exec(function(err, user) {
		var id = user._id;
		console.log(id);
		console.log(User.find({userFriends : '5589b4336e84ad94106f1a58'}));
	});
}

var k = schedule.scheduleJob('* * * * *', function() {
    var users = getUsersWithSoonBirthdays();
	var i = 0;
	while (users[i]) {
		console.log(users[i]);
		console.log(users[i].username);
		getUsersWithThisFriend(users[i].username);
		/* Obtener todos los amigos del usuario y mandarles mail informando del cumpleaños del mismo */
		i++;
	}

    /*var nodemailer = require('nodemailer');
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'hxbirthdays@gmail.com',
            pass: 'HexactaBirthdays1'
        }
    });
    transporter.sendMail({
        from: 'hxbirthdays@gmail.com',
        to: 'hxbirthdays@gmail.com',
        subject: 'Ospin come gato tira piedra',
        text: 'Este es un mensaje autogenerado para decir: Querido Ospin, siscate, siscate, siscate. Firma: El siscador'
    });*/
});
'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	BirthdayFund = mongoose.model('BirthdayFund'),
	Usuario = mongoose.model('User'),
	_ = require('lodash');

var listOfBirthdayFund;

function getListOfBirthdayFund(){

	//BithdayFund harcodeados
	listOfBirthdayFund = [{'id':0,'firstname':'Eduardo','lastname':'Malvino','username':'emalvino', 'birthday':new Date('01/11/1983'),'usersCollecting':[{'name':'Lolo'},{'name':'Juan'}, {'name': 'Pedro'}],'usersGivers':[{'name':'Juan'}, {'name': 'Pedro'}],'amount':40,'collectingDateLimit':'2015-11-25','state':'Active'},
						  {'id':1,'firstname':'Oscar','lastname':'Pinto','username':'opinto', 'birthday':new Date('01/05/1983'),'usersCollecting':[{'name':'Juan'}, {'name': 'Pedro'}],'usersGivers':[{'name':'Juan'}, {'name': 'Pedro'}],'amount':40,'collectingDateLimit':'2015-11-25','state':'Active'},
						  {'id':2,'firstname':'Victor','lastname':'Di Lena','username':'vdilena', 'birthday':new Date('08/15/1984'),'usersCollecting':[{'name':'Juan'}, {'name': 'Pedro'}],'usersGivers':[{'name':'Juan'}, {'name': 'Pedro'}],'amount':40,'collectingDateLimit':'2015-11-25','state':'Active'},
						  {'id':3,'firstname':'Jesica','lastname':'Taira','username':'jtaira', 'birthday':new Date('06/08/1984'),'usersCollecting':[{'name':'Juan'}, {'name': 'Pedro'}],'usersGivers':[{'name':'Juan'}, {'name': 'Pedro'}],'amount':40,'collectingDateLimit':'2015-11-25','state':'Active'},
						  {'id':4,'firstname':'Juan','lastname':'Jaime','username':'jjaime', 'birthday':new Date('11/12/1983'),'usersCollecting':[{'name':'Jesica'}, {'name': 'Victor'}],'usersGivers':[{'name':'Oscar'}],'amount':30,'collectingDateLimit':'2015-11-25','state':'Inactive'},
						  {'id':5,'firstname':'Nahuel','lastname':'Schlegel','username':'nschlegel', 'birthday':new Date('11/06/1983'),'usersCollecting':[{'name':'Jesica'}, {'name': 'Victor'}],'usersGivers':[{'name':'Oscar'}],'amount':30,'collectingDateLimit':'2015-11-25','state':'Inactive'},
						  {'id':6,'firstname':'Marcelo','lastname':'Wieja','username':'mwieja', 'birthday':new Date('11/07/1983'),'usersCollecting':[{'name':'Jesica'}, {'name': 'Victor'}],'usersGivers':[{'name':'Oscar'}],'amount':30,'collectingDateLimit':'2015-11-25','state':'Inactive'},
						  {'id':7,'firstname':'Pablo','lastname':'Morixe','username':'pmorixe', 'birthday':new Date('11/08/1983'),'usersCollecting':[{'name':'Jesica'}, {'name': 'Victor'}],'usersGivers':[{'name':'Oscar'}],'amount':30,'collectingDateLimit':'2015-11-25','state':'Inactive'},
						  {'id':8,'firstname':'Tomas','lastname':'Franco','username':'tfranco', 'birthday':new Date('11/09/1983'),'usersCollecting':[{'name':'Jesica'}, {'name': 'Victor'}],'usersGivers':[{'name':'Oscar'}],'amount':30,'collectingDateLimit':'2015-11-25','state':'Inactive'}];
						
	return listOfBirthdayFund;
}

//Borrar cuando se trabaje con datos reales
function getBirthday(id){

	return listOfBirthdayFund[id];
}

/**
 * Update a BirthdayFundFund
 */
exports.update = function(req, res) {

	console.log('update(): ' + JSON.stringify(req.body));

	var birthdayFund = new BirthdayFund();

	birthdayFund.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(birthdayFund);
		}
	});
};

/**
 * List of BirthdayFunds
 */
exports.list = function(req, res) { 
	BirthdayFund.find().where('username').ne(req.user.username).sort('-birthday').exec(function(err, birthdayFunds) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(getListOfBirthdayFund());
		}
	});
};

/**
 * BirthdayFund middleware
 */
exports.BirthdayFundByID = function(req, res, next, id) { 
	BirthdayFund.findById(id).populate('user', 'displayName').exec(function(err, BirthdayFund) {
		if (err) return next(err);
		if (! BirthdayFund) return next(new Error('Failed to load BirthdayFund ' + id));
		req.BirthdayFund = BirthdayFund ;
		next();
	});
};

/**
 * BirthdayFund authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.BirthdayFund.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

exports.beginFund = function(req, res, next, id) {

	// Usar cuando se trabaje con datos reales
	/*BirthdayFund.findOne().where('id').equals(id).exec(function(err, birthdayFund) {
		console.log('getBirthday()');
		if (err) return next(err);
		if (! birthdayFund){

			 next(new Error('Failed to load BirthdayFund ' + id));	
		} 
		req.birthdayFund = birthdayFund ;
		next();
	});*/
	req.birthdayFund = getBirthday(id);
	next();
};

exports.read = function(req, res) {
	res.jsonp(req.birthdayFund);
};

exports.users = function (req,res,next,birthdayUser){
	Usuario.find().where('username').nin([req.user.username,birthdayUser]).sort('firstName').exec(function(err, users) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(users);
		}
	});
};
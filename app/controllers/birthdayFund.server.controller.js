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
	listOfBirthdayFund = [{'id':1,'firstname':'Eduardo','lastname':'Malvino','username':'emalvino', 'photo': 'http://fotos.hexacta.com:8181/photo.php?username=emalvino', 'birthday':new Date('01/11/1983'),'usersCollecting':[{'name':'Lolo'},{'name':'Juan'}, {'name': 'Pedro'}],'usersGivers':[{'name':'Juan'}, {'name': 'Pedro'}],'amount':40,'collectingDateLimit':new Date('06/20/2015'),'state':'Active'},
						  {'id':2,'firstname':'Oscar','lastname':'Pinto','username':'opinto', 'photo': 'http://fotos.hexacta.com:8181/photo.php?username=opinto', 'birthday':new Date('01/05/1983'),'usersCollecting':[{'name':'Juan'}, {'name': 'Pedro'}],'usersGivers':[{'name':'Juan'}, {'name': 'Pedro'}],'amount':40,'collectingDateLimit':new Date('06/20/2015'),'state':'Active'},
						  {'id':3,'firstname':'Victor','lastname':'Di Lena','username':'vdilena', 'photo': 'http://fotos.hexacta.com:8181/photo.php?username=vdilena', 'birthday':new Date('08/15/1984'),'usersCollecting':[{'name':'Juan'}, {'name': 'Pedro'}],'usersGivers':[{'name':'Juan'}, {'name': 'Pedro'}],'amount':40,'collectingDateLimit':new Date('06/20/2015'),'state':'Active'},
						  {'id':4,'firstname':'Jesica','lastname':'Taira','username':'jtaira', 'photo': 'http://fotos.hexacta.com:8181/photo.php?username=jtaira', 'birthday':new Date('06/08/1984'),'usersCollecting':[{'name':'Juan'}, {'name': 'Pedro'}],'usersGivers':[{'name':'Juan'}, {'name': 'Pedro'}],'amount':40,'collectingDateLimit':new Date('06/20/2015'),'state':'Active'},
						  {'id':5,'firstname':'Juan','lastname':'Jaime','username':'jjaime', 'photo': 'http://fotos.hexacta.com:8181/photo.php?username=jjaime	', 'birthday':new Date('11/12/1983'),'usersCollecting':[{'name':'Jesica'}, {'name': 'Victor'}],'usersGivers':[{'name':'Oscar'}],'amount':30,'collectingDateLimit':new Date('06/20/2015'),'state':'Inactive'}];
						
	return listOfBirthdayFund;
}

/**
 * Update a BirthdayFundFund
 */
exports.update = function(req, res) {
	var birthdayFund = new BirthdayFund(req.body);

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

exports.beginFund = function(req, res, next) {

	
};
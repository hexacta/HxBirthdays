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
	listOfBirthdayFund = [{'id':1,'firstname':'Eduardo','lastname':'Malvino','username':'emalvino', 'photo': 'modules/core/img/users/homero.png', 'birthday':new Date('01/11/1983'),'usersCollecting':[{'name':'Lolo'},{'name':'Juan'}, {'name': 'Pedro'}],'usersGivers':[{'name':'Juan'}, {'name': 'Pedro'}],'amount':40,'state':'Open'},
						  {'id':2,'firstname':'Oscar','lastname':'Pinto','username':'opinto', 'photo': 'modules/core/img/users/homero.png', 'birthday':new Date('01/05/1983'),'usersCollecting':[{'name':'Juan'}, {'name': 'Pedro'}],'usersGivers':[{'name':'Juan'}, {'name': 'Pedro'}],'amount':40,'state':'Open'},
						  {'id':3,'firstname':'Victor','lastname':'Di Lena','username':'vdilena', 'photo': 'modules/core/img/users/homero.png', 'birthday':new Date('15/08/1983'),'usersCollecting':[{'name':'Juan'}, {'name': 'Pedro'}],'usersGivers':[{'name':'Juan'}, {'name': 'Pedro'}],'amount':40,'state':'Open'},
						  {'id':4,'firstname':'Jesica','lastname':'Taira','username':'jtaira', 'photo': 'modules/core/img/users/homero.png', 'birthday':new Date('08/06/1984'),'usersCollecting':[{'name':'Juan'}, {'name': 'Pedro'}],'usersGivers':[{'name':'Juan'}, {'name': 'Pedro'}],'amount':40,'state':'Open'},
						  {'id':5,'firstname':'Juan','lastname':'Jaime','username':'jjaime', 'photo': 'modules/core/img/users/homero.png', 'birthday':new Date('12/11/1983'),'usersCollecting':[{'name':'Jesica'}, {'name': 'Victor'}],'usersGivers':[{'name':'Oscar'}],'amount':30,'state':'Open'}];
						
	return listOfBirthdayFund;
}

function getListWithOutLoginUser(user) {
	var birthdayFunds =  getListOfBirthdayFund();

	console.log(birthdayFunds);

	for(var x in birthdayFunds){
		if(birthdayFunds[x].username === user){
			delete birthdayFunds[x];
		}
	}
	return birthdayFunds;
}

/**
 * Update a BirthdayFundFund
 */
exports.update = function(req, res) {
	console.log('En el controller server');
	var BirthdayFund = req.BirthdayFund ;

	BirthdayFund = _.extend(BirthdayFund , req.body);

	BirthdayFund.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(BirthdayFund);
		}
	});

	console.log(BirthdayFund);
};

/**
 * List of BirthdayFunds
 */
exports.list = function(req, res) { 
	BirthdayFund.find().where('username').ne(req.user.username).sort('-BirthdayFund').populate('user', 'displayName').exec(function(err, birthdayFunds) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(birthdayFunds);
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
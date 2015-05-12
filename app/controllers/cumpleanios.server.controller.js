'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Cumpleanio = mongoose.model('Cumpleanio'),
	_ = require('lodash');

/**
 * Create a Cumpleanio
 */
exports.create = function(req, res) {
	var cumpleanio = new Cumpleanio(req.body);
	cumpleanio.user = req.user;

	cumpleanio.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cumpleanio);
		}
	});
};

/**
 * Show the current Cumpleanio
 */
exports.read = function(req, res) {
	res.jsonp(req.cumpleanio);
};

/**
 * Update a Cumpleanio
 */
exports.update = function(req, res) {
	var cumpleanio = req.cumpleanio ;

	cumpleanio = _.extend(cumpleanio , req.body);

	cumpleanio.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cumpleanio);
		}
	});
};

/**
 * Delete an Cumpleanio
 */
exports.delete = function(req, res) {
	var cumpleanio = req.cumpleanio ;

	cumpleanio.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(cumpleanio);
		}
	});
};

/**
 * List of Cumpleanios
 */
exports.list = function(req, res) { 
	Cumpleanio.find().sort('-created').populate('user', 'displayName').exec(function(err, cumpleanios) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {

			// cumpleanios harcodeados.
			var text = '[{"firstname":"Eduardo","lastname":"Malvino","name":"emalvino","birthday":"1981-02-17T12: 00: 00","collecting":false},{"firstname":"Jesica","lastname":"Taira","name":"jtaira","birthday":"1981-02-17T12: 00: 00","collecting":true},{"firstname":"Juan","lastname":"Jaime","name":"jjaime","birthday":"1981-02-17T12: 00: 00","collecting":true},{"firstname":"Juan","lastname":"Jaime","name":"jjaime","birthday":"1981-02-17T12: 00: 00","collecting":true},{"firstname":"Nahuel","lastname":"Schlegel","name":"nschlegel","birthday":"1981-02-17T12: 00: 00","collecting":false},{"firstname":"Matias","lastname":"Rios","name":"matrios","birthday":"1981-02-17T12: 00: 00","collecting":true},{"firstname":"Oscar","lastname":"Pinto","name":"opinto","birthday":"1981-02-17T12: 00: 00","collecting":false},{"firstname":"Victor","lastname":"Di Lena","name":"vdilena","birthday":"1981-02-17T12: 00: 00","collecting":true},{"firstname":"Pablo","lastname":"Morixe","name":"pmorixe","birthday":"1981-02-17T12: 00: 00","collecting":true},{"firstname":"Marcelo","lastname":"Wieja","name":"mwieja","birthday":"1981-02-17T12: 00: 00","collecting":true}]';
			cumpleanios = JSON.parse(text);

			//lista de cumpleaños
			res.jsonp(cumpleanios);
		}
	});
};

/**
 * Cumpleanio middleware
 */
exports.cumpleanioByID = function(req, res, next, id) { 
	Cumpleanio.findById(id).populate('user', 'displayName').exec(function(err, cumpleanio) {
		if (err) return next(err);
		if (! cumpleanio) return next(new Error('Failed to load Cumpleanio ' + id));
		req.cumpleanio = cumpleanio ;
		next();
	});
};

/**
 * Cumpleanio authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.cumpleanio.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};

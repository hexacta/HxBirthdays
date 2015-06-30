'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Templatemail = mongoose.model('Templatemail'),
	_ = require('lodash');

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

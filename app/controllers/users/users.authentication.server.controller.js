'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	errorHandler = require('../errors.server.controller'),
	mongoose = require('mongoose'),
	passport = require('passport'),
	User = mongoose.model('User');
var	logueo = require('./users.bindAuthentication.server');

/**
 * Signin after passport authentication
 */
exports.signin = function(req, res, next) {
	res=logueo.loginLDAP(req,res);
	};
	

/**
 * Signout
 */
exports.signout = function(req, res) {
	req.logout();
	passport.deserializeUser(function(id, done) {
	  User.findById(id, function(err, user) {
	    done(err, user);
	  });
	});
	res.redirect('/');
};
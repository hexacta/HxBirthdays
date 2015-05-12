'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Cumpleanio Schema
 */
var CumpleanioSchema = new Schema({
	firstname: {
		type: String,
		default: ''
	},
	lastname: {
		type: String,
		default: ''
	},
	name: {
		type: String,
		default: ''
	},
	birthday: {
		type: Date,
		default: Date.now
	},
	collecting: {
		type: Boolean,
		default: false
	}
});

mongoose.model('Cumpleanio', CumpleanioSchema);
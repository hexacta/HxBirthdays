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
	id: {
		type: Number,
		default: 0
	},
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
	},
	collecting_date_limit: {
		type: Date,
		default: Date.now
	},
	user: {// Referencia al usuario
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Cumpleanio', CumpleanioSchema);
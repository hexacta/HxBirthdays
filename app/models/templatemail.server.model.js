'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Templatemail Schema
 */
var TemplatemailSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Templatemail name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Templatemail', TemplatemailSchema);
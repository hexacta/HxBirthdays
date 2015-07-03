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
	subject: {
		type: String,
		default: '',
		required: 'Por favor complete el asunto del mail',
		trim: true
	},
	text: {
		type: String,
		default: '',
		required: 'Por favor complete el cuerpo del mail',
		trim: true
	},
	html: {
		type: String,
		default: '',
		required: 'Por favor complete el cuerpo del mail',
		trim: true
	},
	to: {
		type: [String]
	},
	sender: {
		type: String
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
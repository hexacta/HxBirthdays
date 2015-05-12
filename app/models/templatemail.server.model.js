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
	asunto: {
		type: String,
		default: '',
		required: 'Por favor complete el asunto del mail',
		trim: true
	},
	cuerpo: {
		type: String,
		default: '',
		required: 'Por favor complete el cuerpo del mail',
		trim: true
	},
	destinatarios: {
		type: [String]
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
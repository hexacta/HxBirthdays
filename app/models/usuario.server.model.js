'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema,

/**
 * Usuario Schema
 */
var UsuarioSchema = new Schema({
	nombre: String,
	apellido: String,
	email: {
		type: String,
		trim: true,
		default: '',
		match: [/.+\@.+\..+/, 'Please fill a valid email address']
	},
	username: {
		type: String,
		unique: 'testing error message',
		required: 'Please fill in a username',
		trim: true
	},
	password: {
		type: String,
		default: ''
	},
	fechaDeNacimiento: {
		type: Date
	}
});

mongoose.model('Usuario', UsuarioSchema);
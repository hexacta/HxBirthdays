'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Birthday Fund Schema
 */
var BirthdayFundSchema = new Schema({
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
	username: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	photo: {
		type: String
	},
	birthday: {
		type: Date,
		default: Date.now
	},
	usersCollecting: {
		type: [{name: {type: String}}]
	},
	usersGivers: {
		type: [{name: {type: String}},
			   {amount: {type: Number,
						default: 0}}]
	},
	amount: {
		type: Number,
		default: 0
	}, 
	state: {
		type: String,
		enum: ['Open', 'Closed', 'Canceled ']
	}
});

mongoose.model('BirthdayFund', BirthdayFundSchema);
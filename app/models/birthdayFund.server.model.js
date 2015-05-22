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
		type: String,
		default: ''
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
	collectingDateLimit: {
		type: String
	},
	state: {
		type: String,
		enum: ['Active', 'InActive', 'Closed']
	}
});

mongoose.model('BirthdayFund', BirthdayFundSchema);
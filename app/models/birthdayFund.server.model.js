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
	birthday: {
		type: Date,
		default: Date.now
	},
	usersCollecting: {
		type: [{firstname: {type: String}},
				{username: {type: String}}]
	},
	usersGivers: {
		type: [{firstname: {type: String}},
				{username: {type: String}},
			   {amount: {type: Number,
						default: 0}}]
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
'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Cumpleanio = mongoose.model('Cumpleanio');

/**
 * Globals
 */
var user, cumpleanio;

/**
 * Unit tests
 */
describe('Cumpleanio Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			cumpleanio = new Cumpleanio({
				name: 'Cumpleanio Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return cumpleanio.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			cumpleanio.name = '';

			return cumpleanio.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Cumpleanio.remove().exec();
		User.remove().exec();

		done();
	});
});
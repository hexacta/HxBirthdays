'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Cumpleanio = mongoose.model('Cumpleanio'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, cumpleanio;

/**
 * Cumpleanio routes tests
 */
describe('Cumpleanio CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Cumpleanio
		user.save(function() {
			cumpleanio = {
				name: 'Cumpleanio Name'
			};

			done();
		});
	});

	it('should be able to save Cumpleanio instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cumpleanio
				agent.post('/cumpleanios')
					.send(cumpleanio)
					.expect(200)
					.end(function(cumpleanioSaveErr, cumpleanioSaveRes) {
						// Handle Cumpleanio save error
						if (cumpleanioSaveErr) done(cumpleanioSaveErr);

						// Get a list of Cumpleanios
						agent.get('/cumpleanios')
							.end(function(cumpleaniosGetErr, cumpleaniosGetRes) {
								// Handle Cumpleanio save error
								if (cumpleaniosGetErr) done(cumpleaniosGetErr);

								// Get Cumpleanios list
								var cumpleanios = cumpleaniosGetRes.body;

								// Set assertions
								(cumpleanios[0].user._id).should.equal(userId);
								(cumpleanios[0].name).should.match('Cumpleanio Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Cumpleanio instance if not logged in', function(done) {
		agent.post('/cumpleanios')
			.send(cumpleanio)
			.expect(401)
			.end(function(cumpleanioSaveErr, cumpleanioSaveRes) {
				// Call the assertion callback
				done(cumpleanioSaveErr);
			});
	});

	it('should not be able to save Cumpleanio instance if no name is provided', function(done) {
		// Invalidate name field
		cumpleanio.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cumpleanio
				agent.post('/cumpleanios')
					.send(cumpleanio)
					.expect(400)
					.end(function(cumpleanioSaveErr, cumpleanioSaveRes) {
						// Set message assertion
						(cumpleanioSaveRes.body.message).should.match('Please fill Cumpleanio name');
						
						// Handle Cumpleanio save error
						done(cumpleanioSaveErr);
					});
			});
	});

	it('should be able to update Cumpleanio instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cumpleanio
				agent.post('/cumpleanios')
					.send(cumpleanio)
					.expect(200)
					.end(function(cumpleanioSaveErr, cumpleanioSaveRes) {
						// Handle Cumpleanio save error
						if (cumpleanioSaveErr) done(cumpleanioSaveErr);

						// Update Cumpleanio name
						cumpleanio.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Cumpleanio
						agent.put('/cumpleanios/' + cumpleanioSaveRes.body._id)
							.send(cumpleanio)
							.expect(200)
							.end(function(cumpleanioUpdateErr, cumpleanioUpdateRes) {
								// Handle Cumpleanio update error
								if (cumpleanioUpdateErr) done(cumpleanioUpdateErr);

								// Set assertions
								(cumpleanioUpdateRes.body._id).should.equal(cumpleanioSaveRes.body._id);
								(cumpleanioUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Cumpleanios if not signed in', function(done) {
		// Create new Cumpleanio model instance
		var cumpleanioObj = new Cumpleanio(cumpleanio);

		// Save the Cumpleanio
		cumpleanioObj.save(function() {
			// Request Cumpleanios
			request(app).get('/cumpleanios')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Cumpleanio if not signed in', function(done) {
		// Create new Cumpleanio model instance
		var cumpleanioObj = new Cumpleanio(cumpleanio);

		// Save the Cumpleanio
		cumpleanioObj.save(function() {
			request(app).get('/cumpleanios/' + cumpleanioObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', cumpleanio.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Cumpleanio instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Cumpleanio
				agent.post('/cumpleanios')
					.send(cumpleanio)
					.expect(200)
					.end(function(cumpleanioSaveErr, cumpleanioSaveRes) {
						// Handle Cumpleanio save error
						if (cumpleanioSaveErr) done(cumpleanioSaveErr);

						// Delete existing Cumpleanio
						agent.delete('/cumpleanios/' + cumpleanioSaveRes.body._id)
							.send(cumpleanio)
							.expect(200)
							.end(function(cumpleanioDeleteErr, cumpleanioDeleteRes) {
								// Handle Cumpleanio error error
								if (cumpleanioDeleteErr) done(cumpleanioDeleteErr);

								// Set assertions
								(cumpleanioDeleteRes.body._id).should.equal(cumpleanioSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Cumpleanio instance if not signed in', function(done) {
		// Set Cumpleanio user 
		cumpleanio.user = user;

		// Create new Cumpleanio model instance
		var cumpleanioObj = new Cumpleanio(cumpleanio);

		// Save the Cumpleanio
		cumpleanioObj.save(function() {
			// Try deleting Cumpleanio
			request(app).delete('/cumpleanios/' + cumpleanioObj._id)
			.expect(401)
			.end(function(cumpleanioDeleteErr, cumpleanioDeleteRes) {
				// Set message assertion
				(cumpleanioDeleteRes.body.message).should.match('User is not logged in');

				// Handle Cumpleanio error error
				done(cumpleanioDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Cumpleanio.remove().exec();
		done();
	});
});
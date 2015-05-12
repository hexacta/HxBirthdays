'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Templatemail = mongoose.model('Templatemail'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, templatemail;

/**
 * Templatemail routes tests
 */
describe('Templatemail CRUD tests', function() {
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

		// Save a user to the test db and create new Templatemail
		user.save(function() {
			templatemail = {
				name: 'Templatemail Name'
			};

			done();
		});
	});

	it('should be able to save Templatemail instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Templatemail
				agent.post('/templatemails')
					.send(templatemail)
					.expect(200)
					.end(function(templatemailSaveErr, templatemailSaveRes) {
						// Handle Templatemail save error
						if (templatemailSaveErr) done(templatemailSaveErr);

						// Get a list of Templatemails
						agent.get('/templatemails')
							.end(function(templatemailsGetErr, templatemailsGetRes) {
								// Handle Templatemail save error
								if (templatemailsGetErr) done(templatemailsGetErr);

								// Get Templatemails list
								var templatemails = templatemailsGetRes.body;

								// Set assertions
								(templatemails[0].user._id).should.equal(userId);
								(templatemails[0].name).should.match('Templatemail Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Templatemail instance if not logged in', function(done) {
		agent.post('/templatemails')
			.send(templatemail)
			.expect(401)
			.end(function(templatemailSaveErr, templatemailSaveRes) {
				// Call the assertion callback
				done(templatemailSaveErr);
			});
	});

	it('should not be able to save Templatemail instance if no name is provided', function(done) {
		// Invalidate name field
		templatemail.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Templatemail
				agent.post('/templatemails')
					.send(templatemail)
					.expect(400)
					.end(function(templatemailSaveErr, templatemailSaveRes) {
						// Set message assertion
						(templatemailSaveRes.body.message).should.match('Please fill Templatemail name');
						
						// Handle Templatemail save error
						done(templatemailSaveErr);
					});
			});
	});

	it('should be able to update Templatemail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Templatemail
				agent.post('/templatemails')
					.send(templatemail)
					.expect(200)
					.end(function(templatemailSaveErr, templatemailSaveRes) {
						// Handle Templatemail save error
						if (templatemailSaveErr) done(templatemailSaveErr);

						// Update Templatemail name
						templatemail.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Templatemail
						agent.put('/templatemails/' + templatemailSaveRes.body._id)
							.send(templatemail)
							.expect(200)
							.end(function(templatemailUpdateErr, templatemailUpdateRes) {
								// Handle Templatemail update error
								if (templatemailUpdateErr) done(templatemailUpdateErr);

								// Set assertions
								(templatemailUpdateRes.body._id).should.equal(templatemailSaveRes.body._id);
								(templatemailUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Templatemails if not signed in', function(done) {
		// Create new Templatemail model instance
		var templatemailObj = new Templatemail(templatemail);

		// Save the Templatemail
		templatemailObj.save(function() {
			// Request Templatemails
			request(app).get('/templatemails')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Templatemail if not signed in', function(done) {
		// Create new Templatemail model instance
		var templatemailObj = new Templatemail(templatemail);

		// Save the Templatemail
		templatemailObj.save(function() {
			request(app).get('/templatemails/' + templatemailObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', templatemail.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Templatemail instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Templatemail
				agent.post('/templatemails')
					.send(templatemail)
					.expect(200)
					.end(function(templatemailSaveErr, templatemailSaveRes) {
						// Handle Templatemail save error
						if (templatemailSaveErr) done(templatemailSaveErr);

						// Delete existing Templatemail
						agent.delete('/templatemails/' + templatemailSaveRes.body._id)
							.send(templatemail)
							.expect(200)
							.end(function(templatemailDeleteErr, templatemailDeleteRes) {
								// Handle Templatemail error error
								if (templatemailDeleteErr) done(templatemailDeleteErr);

								// Set assertions
								(templatemailDeleteRes.body._id).should.equal(templatemailSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Templatemail instance if not signed in', function(done) {
		// Set Templatemail user 
		templatemail.user = user;

		// Create new Templatemail model instance
		var templatemailObj = new Templatemail(templatemail);

		// Save the Templatemail
		templatemailObj.save(function() {
			// Try deleting Templatemail
			request(app).delete('/templatemails/' + templatemailObj._id)
			.expect(401)
			.end(function(templatemailDeleteErr, templatemailDeleteRes) {
				// Set message assertion
				(templatemailDeleteRes.body.message).should.match('User is not logged in');

				// Handle Templatemail error error
				done(templatemailDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Templatemail.remove().exec();
		done();
	});
});
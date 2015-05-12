'use strict';

(function() {
	// Templatemails Controller Spec
	describe('Templatemails Controller Tests', function() {
		// Initialize global variables
		var TemplatemailsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Templatemails controller.
			TemplatemailsController = $controller('TemplatemailsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Templatemail object fetched from XHR', inject(function(Templatemails) {
			// Create sample Templatemail using the Templatemails service
			var sampleTemplatemail = new Templatemails({
				name: 'New Templatemail'
			});

			// Create a sample Templatemails array that includes the new Templatemail
			var sampleTemplatemails = [sampleTemplatemail];

			// Set GET response
			$httpBackend.expectGET('templatemails').respond(sampleTemplatemails);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.templatemails).toEqualData(sampleTemplatemails);
		}));

		it('$scope.findOne() should create an array with one Templatemail object fetched from XHR using a templatemailId URL parameter', inject(function(Templatemails) {
			// Define a sample Templatemail object
			var sampleTemplatemail = new Templatemails({
				name: 'New Templatemail'
			});

			// Set the URL parameter
			$stateParams.templatemailId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/templatemails\/([0-9a-fA-F]{24})$/).respond(sampleTemplatemail);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.templatemail).toEqualData(sampleTemplatemail);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Templatemails) {
			// Create a sample Templatemail object
			var sampleTemplatemailPostData = new Templatemails({
				name: 'New Templatemail'
			});

			// Create a sample Templatemail response
			var sampleTemplatemailResponse = new Templatemails({
				_id: '525cf20451979dea2c000001',
				name: 'New Templatemail'
			});

			// Fixture mock form input values
			scope.name = 'New Templatemail';

			// Set POST response
			$httpBackend.expectPOST('templatemails', sampleTemplatemailPostData).respond(sampleTemplatemailResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Templatemail was created
			expect($location.path()).toBe('/templatemails/' + sampleTemplatemailResponse._id);
		}));

		it('$scope.update() should update a valid Templatemail', inject(function(Templatemails) {
			// Define a sample Templatemail put data
			var sampleTemplatemailPutData = new Templatemails({
				_id: '525cf20451979dea2c000001',
				name: 'New Templatemail'
			});

			// Mock Templatemail in scope
			scope.templatemail = sampleTemplatemailPutData;

			// Set PUT response
			$httpBackend.expectPUT(/templatemails\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/templatemails/' + sampleTemplatemailPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid templatemailId and remove the Templatemail from the scope', inject(function(Templatemails) {
			// Create new Templatemail object
			var sampleTemplatemail = new Templatemails({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Templatemails array and include the Templatemail
			scope.templatemails = [sampleTemplatemail];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/templatemails\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleTemplatemail);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.templatemails.length).toBe(0);
		}));
	});
}());
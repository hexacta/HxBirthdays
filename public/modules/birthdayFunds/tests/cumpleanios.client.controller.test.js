'use strict';

(function() {
	// Cumpleanios Controller Spec
	describe('Cumpleanios Controller Tests', function() {
		// Initialize global variables
		var CumpleaniosController,
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

			// Initialize the Cumpleanios controller.
			CumpleaniosController = $controller('CumpleaniosController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Cumpleanio object fetched from XHR', inject(function(Cumpleanios) {
			// Create sample Cumpleanio using the Cumpleanios service
			var sampleCumpleanio = new Cumpleanios({
				name: 'New Cumpleanio'
			});

			// Create a sample Cumpleanios array that includes the new Cumpleanio
			var sampleCumpleanios = [sampleCumpleanio];

			// Set GET response
			$httpBackend.expectGET('cumpleanios').respond(sampleCumpleanios);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.cumpleanios).toEqualData(sampleCumpleanios);
		}));

		it('$scope.findOne() should create an array with one Cumpleanio object fetched from XHR using a cumpleanioId URL parameter', inject(function(Cumpleanios) {
			// Define a sample Cumpleanio object
			var sampleCumpleanio = new Cumpleanios({
				name: 'New Cumpleanio'
			});

			// Set the URL parameter
			$stateParams.cumpleanioId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/cumpleanios\/([0-9a-fA-F]{24})$/).respond(sampleCumpleanio);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.cumpleanio).toEqualData(sampleCumpleanio);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Cumpleanios) {
			// Create a sample Cumpleanio object
			var sampleCumpleanioPostData = new Cumpleanios({
				name: 'New Cumpleanio'
			});

			// Create a sample Cumpleanio response
			var sampleCumpleanioResponse = new Cumpleanios({
				_id: '525cf20451979dea2c000001',
				name: 'New Cumpleanio'
			});

			// Fixture mock form input values
			scope.name = 'New Cumpleanio';

			// Set POST response
			$httpBackend.expectPOST('cumpleanios', sampleCumpleanioPostData).respond(sampleCumpleanioResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Cumpleanio was created
			expect($location.path()).toBe('/cumpleanios/' + sampleCumpleanioResponse._id);
		}));

		it('$scope.update() should update a valid Cumpleanio', inject(function(Cumpleanios) {
			// Define a sample Cumpleanio put data
			var sampleCumpleanioPutData = new Cumpleanios({
				_id: '525cf20451979dea2c000001',
				name: 'New Cumpleanio'
			});

			// Mock Cumpleanio in scope
			scope.cumpleanio = sampleCumpleanioPutData;

			// Set PUT response
			$httpBackend.expectPUT(/cumpleanios\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/cumpleanios/' + sampleCumpleanioPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid cumpleanioId and remove the Cumpleanio from the scope', inject(function(Cumpleanios) {
			// Create new Cumpleanio object
			var sampleCumpleanio = new Cumpleanios({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Cumpleanios array and include the Cumpleanio
			scope.cumpleanios = [sampleCumpleanio];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/cumpleanios\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleCumpleanio);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.cumpleanios.length).toBe(0);
		}));
	});
}());
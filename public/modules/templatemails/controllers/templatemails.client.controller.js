'use strict';

// Templatemails controller
angular.module('templatemails').controller('TemplatemailsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Templatemails',
	function($scope, $stateParams, $location, Authentication, Templatemails) {
		$scope.authentication = Authentication;

		// Create new Templatemail
		$scope.create = function() {
			// Create new Templatemail object
			var templatemail = new Templatemails ({
				asunto: this.asunto,
				cuerpo: this.cuerpo
			});

			// Redirect after save
			templatemail.$save(function(response) {
				$location.path('templatemails/' + response._id);

				// Clear form fields
				$scope.asunto = '';
				$scope.cuerpo = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Templatemail
		$scope.remove = function(templatemail) {
			if ( templatemail ) { 
				templatemail.$remove();

				for (var i in $scope.templatemails) {
					if ($scope.templatemails [i] === templatemail) {
						$scope.templatemails.splice(i, 1);
					}
				}
			} else {
				$scope.templatemail.$remove(function() {
					$location.path('templatemails');
				});
			}
		};

		// Update existing Templatemail
		$scope.update = function() {
			var templatemail = $scope.templatemail;

			templatemail.$update(function() {
				$location.path('templatemails/' + templatemail._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Templatemails
		$scope.find = function() {
			$scope.templatemails = Templatemails.query();
		};

		// Find existing Templatemail
		$scope.findOne = function() {
			$scope.templatemail = Templatemails.get({ 
				templatemailId: $stateParams.templatemailId
			});
		};
	}
]);
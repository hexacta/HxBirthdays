'use strict';

// Cumpleanios controller
angular.module('cumpleanios').controller('CumpleaniosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cumpleanios',
	function($scope, $stateParams, $location, Authentication, Cumpleanios) {
		$scope.authentication = Authentication;

		// Create new Cumpleanio
		$scope.create = function() {
			// Create new Cumpleanio object
			var cumpleanio = new Cumpleanios ({
				name: this.name
			});

			// Redirect after save
			cumpleanio.$save(function(response) {
				$location.path('cumpleanios/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Cumpleanio
		$scope.remove = function(cumpleanio) {
			if ( cumpleanio ) { 
				cumpleanio.$remove();

				for (var i in $scope.cumpleanios) {
					if ($scope.cumpleanios [i] === cumpleanio) {
						$scope.cumpleanios.splice(i, 1);
					}
				}
			} else {
				$scope.cumpleanio.$remove(function() {
					$location.path('cumpleanios');
				});
			}
		};

		// Update existing Cumpleanio
		$scope.update = function() {
			var cumpleanio = $scope.cumpleanio;

			cumpleanio.$update(function() {
				$location.path('cumpleanios/' + cumpleanio._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Cumpleanios
		$scope.find = function() {
			$scope.cumpleanios = Cumpleanios.query();
		};

		// Find existing Cumpleanio
		$scope.findOne = function() {

			console.log("Lista de cumpleaños: " + $stateParams.cumpleanioId);

			$scope.cumpleanio = Cumpleanios.get({ 
				cumpleanioId: $stateParams.cumpleanioId
			});
		};
	}
]);
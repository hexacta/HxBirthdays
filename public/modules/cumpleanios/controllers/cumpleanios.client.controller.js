'use strict';

// Cumpleanios controller
angular.module('cumpleanios').controller('CumpleaniosController', ['$scope', '$stateParams', '$location', 'Authentication', 'Cumpleanios', 'CumpleaniosNoColectados',
	function($scope, $stateParams, $location, Authentication, Cumpleanios, CumpleaniosNoColectados) {
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
			console.log('quiere hacer update de cumpleaños!!!: ' + cumpleanio.id);

			cumpleanio.$update(function() {
				$location.path('cumpleanios/');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Cumpleanios
		$scope.find = function() {

			$scope.cumpleanios = Cumpleanios.query();
		};

		// Busca un cumpleaños para el que no se esta juntando
		$scope.findOne = function() {

			$scope.cumpleanio = CumpleaniosNoColectados.get({ 
				cumpleanioId: $stateParams.cumpleanioId
			});
		};

		$scope.cumpleaniosNoColectados = function (){

			$scope.cumpleanios = CumpleaniosNoColectados.query();
		
		};

		$scope.chargeInBirthdayCollectedList = function (){

			console.log('chargeInBirthdayCollectedList()');
			var cumpleanio = $scope.cumpleanio;
			cumpleanio.$chargeInBirthdayCollectedList(function() {
				//$location.path('cumpleanios/');
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};
	}
]);
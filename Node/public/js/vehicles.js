angular.module("mainApp").controller("vehiclesController", function($scope, $stateParams){
	$scope.vehiclesArr = [];
	$scope.form = {};

	$scope.addVehicle = function(vehicle) {
		var newVehicle = {
			year: form.year,
			make: form.make,
			model: form.model,
			history: []
		};
	}
})
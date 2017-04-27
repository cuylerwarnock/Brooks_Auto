angular.module("mainApp").controller("vehiclesController", function($scope, $stateParams, $rootScope, userService){
	$scope.vehiclesList = $rootScope.current_user.vehicles;
	$scope.form = {};
	$scope.current = "";

	$scope.setCurrentVehicle=function(index) {
		$scope.current=index;
		$scope.form.year=$scope.vehiclesList[index].year;
		$scope.form.make=$scope.vehiclesList[index].make;
		$scope.form.model=$scope.vehiclesList[index].model;
	}

	$scope.addVehicle = function(){
		var newVehicle = {
			year: "",
			make: "",
			model: "new vehicle"
		};
		$rootScope.current_user.vehicles.push(newVehicle);
		userService.update($rootScope.current_user);
	}

	$scope.updateVehicle = function(){
		$scope.vehiclesList[$scope.current].year=$scope.form.year;
		$scope.vehiclesList[$scope.current].make=$scope.form.make;
		$scope.vehiclesList[$scope.current].model=$scope.form.model;
		userService.update($rootScope.current_user);
	}

	$scope.removeVehicle = function(){
		$scope.vehiclesList.splice($scope.current, 1);
		userService.update($rootScope.current_user);
	}
})
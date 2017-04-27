angular.module("mainApp").controller("vehiclesController", function($scope, $stateParams, $rootScope, userService){
	$scope.vehiclesList = userService.query($rootScope.current_user.username).vehicles;
	$scope.form = {};

	$scope.setCurrentVehicle=function(index) {
		$scope.currentVehicle=index;
		$scope.form.year=$scope.partsList[index].year;
		$scope.form.make=$scope.partsList[index].make;
		$scope.form.model=$scope.partsList[index].model;

	}
})
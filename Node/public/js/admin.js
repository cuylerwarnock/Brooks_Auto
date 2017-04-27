angular.module("mainApp").controller("adminController", function($scope, $rootScope, partService, orderService, userService){
	$scope.partsList = partService.query();
	$scope.ordersList = orderService.query();
	$scope.currentPart;
	$scope.currentOrder;

})
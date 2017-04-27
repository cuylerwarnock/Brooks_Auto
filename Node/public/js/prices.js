angular.module("mainApp").controller("pricesController", function($scope, $rootScope, partService, orderService, userService, partAllService, orderAllService){
	$scope.partsList = partService.query();
	$scope.currentPart;

	$scope.addCart = function(item){
		$rootScope.current_user.cart.push(item);
		userService.update($rootScope.current_user);
	}

	$scope.setCurrentPart=function(index) {
		$scope.currentPart=index;
		// $scope.partForm.name=$scope.partsList[index].name;
		// $scope.partForm.partID=$scope.partsList[index].partID;
		// $scope.partForm.price=$scope.partsList[index].price;
	}
})
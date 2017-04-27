angular.module("mainApp").controller("cartController", function($scope, $rootScope, partService, orderService, userService, partAllService, orderAllService){
	// $scope.cart = userService.query($rootScope.current_user.username).cart;
	$scope.cart = $rootScope.current_user.cart;
	$scope.current;
	$scope.form = {};

	//from cart page, have remove item from cart, submit cart.
	$scope.removeOrder = function(){
		$rootScope.current_user.cart.splice($scope.current, 1);
		userService.update($rootScope.current_user);
		$scope.cart.splice($scope.current, 1);
	}

	$scope.setCurrentItem=function(index) {
		$scope.current=index;
		$scope.form.name=$scope.partsList[index].name;
		$scope.form.partID=$scope.partsList[index].partID;
		$scope.form.price=$scope.partsList[index].price;
	}

	$scope.submitCart = function(){
		//create order object, send it off
	}
})
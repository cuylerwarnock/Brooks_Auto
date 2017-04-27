angular.module("mainApp").controller("cartController", function($scope, $rootScope, partService, orderService, userService, partAllService, orderAllService){
	// $scope.cart = userService.query($rootScope.current_user.username).cart;
	$scope.current;
	$scope.form = {};
	$scope.cartTotal = 0;
	$scope.vehicle = "";
	$rootScope.current_user.cart.forEach(function(cartItem){
		$scope.cartTotal += Number(cartItem.price);
	})
	$scope.cartTotal = $scope.cartTotal.toFixed(2);

	$scope.removeCart = function(item, index){
		console.log(item);
		$scope.cartTotal = ($scope.cartTotal-item.price).toFixed(2);
		$rootScope.current_user.cart.splice(index, 1);
		userService.update($rootScope.current_user);
	}

	$scope.setCurrentItem=function(index) {
		$scope.current=index;
		$scope.form.name=$scope.partsList[index].name;
		$scope.form.partID=$scope.partsList[index].partID;
		$scope.form.price=$scope.partsList[index].price;
	}

	$scope.submitCart = function(){
		if($rootScope.current_user.cart.length>0 && $scope.vehicle!==""){
			var order = {
				name: $rootScope.current_user.fname+" "+$rootScope.current_user.lname,
				total: $scope.cartTotal,
				parts: $rootScope.current_user.cart,
				active: "Yes",
				vehicle: $scope.vehicle
			};
			orderAllService.save(order, function(res){
				$rootScope.current_user.cart = [];
				userService.update($rootScope.current_user);
				$scope.cartTotal = 0;
			});
		}
	}
})
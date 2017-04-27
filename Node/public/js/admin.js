angular.module("mainApp").controller("adminController", function($scope, $rootScope, partService, orderService, userService, partAllService, orderAllService){
	$scope.partsList = partService.query();
	$scope.ordersList = orderService.query();
	$scope.currentPart;
	$scope.currentOrder;
	$scope.partForm = {};
	$scope.orderForm = {};

	$scope.addPart = function(){
		var newPart = {
			name: "new part",
			url: "",
			price: 0
		}
		$scope.partsList.push(newPart);
		partAllService.save(newPart);
	}

	$scope.updatePart = function(){
		$scope.partsList[$scope.currentPart].name=$scope.partForm.name;
		$scope.partsList[$scope.currentPart].price=$scope.partForm.price;
		$scope.partsList[$scope.currentPart].img=$scope.partForm.img;
		partService.update($scope.partsList[$scope.currentPart]);
	}

	$scope.removeOrder = function(){
		orderService.delete($scope.ordersList[$scope.currentOrder]);
		$scope.ordersList.splice($scope.currentOrder, 1);
	}

	$scope.setCurrentPart=function(index) {
		$scope.currentPart=index;
		$scope.partForm.name=$scope.partsList[index].name;
		$scope.partForm.price=$scope.partsList[index].price;
		$scope.partForm.img=$scope.partsList[index].img;
	}

	$scope.setCurrentOrder=function(index) {
		$scope.currentOrder=index;
		$scope.orderForm.name=$scope.ordersList[index].name;
		$scope.orderForm.total=$scope.ordersList[index].total;
		$scope.orderForm.parts=$scope.ordersList[index].parts;
		$scope.orderForm.active=$scope.ordersList[index].active;
	}
})
angular.module("mainApp").controller("adminController", function($scope, $rootScope, partService, orderService, userService, partAllService, orderAllService){
	$scope.partsList = partService.query();
	$scope.ordersList = orderService.query();
	$scope.currentPart;
	$scope.currentOrder;
	$scope.partForm = {};
	$scope.orderForm = {};

	$scope.addPart = function(){
		var newPart = {
			name: "newPart",
			partID: "part num",
			price: 0
		}
		$scope.partsList.push(newPart);
		partAllService.save(newPart);
	}

	$scope.setCurrentPart=function(index) {
		$scope.currentPart=index;
		$scope.partForm.name=$scope.partsList[index].name;
		$scope.partForm.partID=$scope.partsList[index].partID;
		$scope.partForm.price=$scope.partsList[index].price;
	}

	$scope.setCurrentOrder=function(index) {
		$scope.currentOrder=index;
		$scope.orderForm.name=$scope.partsList[index].name;
		$scope.orderForm.total=$scope.partsList[index].total;
		$scope.orderForm.parts=$scope.partsList[index].parts;
		$scope.orderForm.services=$scope.partsList[index].services;
		$scope.orderForm.active=$scope.partsList[index].active;
	}
})
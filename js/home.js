angular.module("mainApp").controller("homeController", function($scope) {
		//consider passing $scope to controller function and using it instead of this
		$scope.students=[
		{text:"Student one", active:false, done:false},
		{text:"Student two", active:false, done:false}];

		$scope.addItem=function() {
			if($scope.inputText) {
				$scope.students.push({text:$scope.inputText, active: false, done:false});
				$scope.inputText="";
			}
		};

		$scope.removeItem=function() {
			for (var i=0;i<$scope.students.length;i++) {
				if ($scope.students[i].active) {
					$scope.students.splice(i,1);
					i--;
				}
			}
		};

		$scope.eligible=function() {
			var count=0;
			angular.forEach($scope.students, function(item) {
				count+=item.done ? 0 : 1;
			});
			return count;
		};

		$scope.complete=function() {
			angular.forEach($scope.students, function(item) {
				if(item.active) {
					item.done=true;
					item.active=false;
				}
			});
		};

		$scope.reset=function() {
			angular.forEach($scope.students, function(item) {
				item.done=false;
				item.active=false;
			})
		};

		$scope.selectRandom=function() {
			var tempArr=[];
			angular.forEach($scope.students, function(item) {
				if (!item.done && !item.active)
					tempArr.push(item);
			});
			if (tempArr.length>0)
				tempArr[Math.floor(Math.random() * (tempArr.length))].active=true;
		};
	})
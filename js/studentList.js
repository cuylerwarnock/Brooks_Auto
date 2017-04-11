angular.module("mainApp").controller('studentListController', function($scope, $stateParams, sidebarData) {
	$scope.studentArr=[
	{name: "Student One", id: 0, LType: "t1", PType: "t2", RLevel: 8, classes: [], groups: []},
	{name: "Student Two", id: 1, LType: "t1", PType: "t2", RLevel: 8, classes: [], groups: []}];
	$scope.current=0;
	$scope.form={};

	$scope.addStudent=function() {
		$scope.studentArr.push({name: "New Student", id: $scope.studentArr.length, LType: "", PType: "", RLevel: 0, classes: [], groups: []});
	}

	$scope.removeStudent=function() {
		$scope.studentArr.splice($scope.current, 1);
	}

	$scope.setCurrent=function(index) {
		$scope.current=index;
		$scope.form.name=$scope.studentArr[index].name;
		$scope.form.id=$scope.studentArr[index].id;
		$scope.form.LType=$scope.studentArr[index].LType;
		$scope.form.PType=$scope.studentArr[index].PType;
		$scope.form.RLevel=$scope.studentArr[index].RLevel;
	}

	$scope.update=function(student) {
		$scope.studentArr[$scope.current].name=student.name;
		$scope.studentArr[$scope.current].id=student.id;
		$scope.studentArr[$scope.current].LType=student.LType;
		$scope.studentArr[$scope.current].PType=student.PType;
		$scope.studentArr[$scope.current].RLevel=student.RLevel;
		//DB update
	}
});

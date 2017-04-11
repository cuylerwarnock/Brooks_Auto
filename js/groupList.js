angular.module("mainApp").controller('groupListController', function($scope, $stateParams, sidebarData) {
	$scope.studentArr=[
	{name: "Student One", id: 0, trait1: "t1", trait2: "t2"},
	{name: "Student Two", id: 1, trait1: "t1", trait2: "t2"}];

	$scope.groupArr=[
	{name: "Group One", id: 0, trait1: "t1", trait2: "t2"},
	{name: "Group Two", id: 1, trait1: "t1", trait2: "t2"}];
	$scope.current=0;
	$scope.form={};

	$scope.addGroup=function() {
		$scope.groupArr.push({name: "New Group", id: $scope.groupArr.length, trait1: "", trait2: ""});
	}

	$scope.removeGroup=function() {
		$scope.groupArr.splice($scope.current, 1);
	}

	$scope.setCurrent=function(index) {
		$scope.current=index;
		$scope.form.name=$scope.groupArr[index].name;
		$scope.form.id=$scope.groupArr[index].id;
		$scope.form.trait1=$scope.groupArr[index].trait1;
		$scope.form.trait2=$scope.groupArr[index].trait2;
	}

	$scope.update=function(group) {
		$scope.groupArr[$scope.current].name=group.name;
		$scope.groupArr[$scope.current].id=group.id;
		$scope.groupArr[$scope.current].trait1=group.trait1;
		$scope.groupArr[$scope.current].trait2=group.trait2;
		//DB update
	}
});

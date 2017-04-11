angular.module("mainApp").controller('classListController', function($scope, $stateParams, sidebarData) {
	$scope.studentArr=[
	{name: "Student One", id: 0},
	{name: "Student Two", id: 1}];

	//Make studentlist be an array of names, remove studentArr^
	$scope.classArr=[
	{name: "Class One", teacher: "T1", studentList: "garbo", groupList: "trash"},
	{name: "Class Two", teacher: "T2", studentList: "garbo", groupList: "trash"}];
	$scope.current=0;
	$scope.form={};

	$scope.groupArr=[
	{name: "Group One", id: 0},
	{name: "Group Two", id: 1}];

	$scope.addClass=function() {
		$scope.classArr.push({name: "New Class", teacher: "", studentList: "", groupList: ""});
	}

	$scope.removeClass=function() {
		$scope.classArr.splice($scope.current, 1);
	}

	$scope.setCurrent=function(index) {
		$scope.current=index;
		$scope.form.name=$scope.classArr[index].name;
		$scope.form.teacher=$scope.classArr[index].teacher;
	}

	$scope.update=function(c) {
		$scope.classArr[$scope.current].name=c.name;
		$scope.classArr[$scope.current].teacher=c.teacher;
		//DB update
		//need to setup student and group arr pulls
	}
});

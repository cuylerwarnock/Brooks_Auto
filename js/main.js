var app = angular.module("mainApp", ["ui.router"]);

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	function($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'homeController'
			});
		$stateProvider.state('Class List', {
				url: '/classList',
				templateUrl: '/classList.html',
				controller: 'classListController'
			});
		$stateProvider.state('Student List', {
				url: '/studentList',
				templateUrl: '/studentList.html',
				controller: 'studentListController'
			});
		$stateProvider.state('Group List', {
				url: '/groupList',
				templateUrl: '/groupList.html',
				controller: 'groupListController'
			});
		$urlRouterProvider.otherwise('home');
}]);

app.factory('sidebarData', [function() {
	var sbArr=[
		{text: "Home", active: false, children: []},
		{text: "Classes", active: false, children: [{text: "Class List", active: false},{text: "Class Options", active: false}]},
		{text: "Students", active: false, children: [{text: "Student List", active: false},{text: "Student Options", active: false}]},
		{text: "Groups", active: false, children: [{text: "Group List", active: false},{text: "Group Options", active: false}]},
		{text: "Seating", active: false, children: [{text: "Seating Charts", active: false},{text: "Seating Options", active: false}]}];

	return sbArr;
}]);

app.controller("sidebarController", function($scope, $state, sidebarData) {		
	$scope.sidebarArr=sidebarData;
	$scope.stateName=$state;
	$scope.deActivateAll=function() {
		for(var i=0;i<$scope.sidebarArr.length;i++) {
			$scope.sidebarArr[i].active=false;
			for(var j=0;j<$scope.sidebarArr[i].children.length;j++) {
				$scope.sidebarArr[i].children[j].active=false;
			}
		}
	};

	$scope.setActiveChild=function(child) {
		$scope.deActivateAll();
		child.active=true;
		$state.go(child.text);
	};

	$scope.setActiveParent=function(parent) {
		if(parent.children.length==0) {
			$scope.deActivateAll();
			parent.active=true;
			$state.go(parent.text);
		}
	};
});

app.controller("authenticationController", function($scope) {
	$scope.user = {username: '', password: ''};
	$scope.error_message = '';

	$scope.login = function(){
    	//placeholder until authentication is implemented
    	$scope.error_message = 'login request for ' + $scope.user.username;
  	};

  	$scope.register = function(){
    	//placeholder until authentication is implemented
    	$scope.error_message = 'registeration request for ' + $scope.user.username;
  	};
});
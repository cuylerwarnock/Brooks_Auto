var app = angular.module("mainApp", ["ui.router", "ngResource"]).run(function($rootScope, $http, checkLoginService, $location, $state){
	$rootScope.authenticated = false;
	$rootScope.current_user = "";
	$rootScope.currentClass = ""

	$rootScope.loggedIn = function()
	{
		checkLoginService.save(function(data)
		{
			if(data.state == 'success')
			{
				$rootScope.authenticated = data.user;
				$rootScope.current_user = data.user;
				$state.go('Home');
			}
			else
			{
				$rootScope.authenticated = data.user;
				$rootScope.current_user = '';
				$state.go('Login');
			}
		});
	};

  	$rootScope.loggedIn();

	$rootScope.signout = function(){
		$rootScope.authenticated = false;
		$rootScope.current_user = "";
		$rootScope.currentClass = "";
		$http.get('/auth/signout');
		angular.element(document.querySelectorAll(".refreshCollapse")).removeClass("in");
		//$state.go('Home',{},{reload:true});
		$rootScope.$broadcast('logout');
		$state.go('Login');
	}
});

app.config([
	'$stateProvider',
	'$urlRouterProvider',
	'$locationProvider',
	function($stateProvider, $urlRouterProvider, $locationProvider) {
		$stateProvider.state('Home', {
				url: '/home',
				templateUrl: '/home.html',
				controller: 'homeController'
			});
		$stateProvider.state('Login', {
				url: '/login',
				templateUrl: '/login.html',
				controller: 'authenticationController'
			});
		$stateProvider.state('Signup', {
				url: '/signup',
				templateUrl: '/signup.html',
				controller: 'authenticationController'
			});
		$stateProvider.state('Vehicles', {
				url: '/vehicles',
				templateUrl: '/vehicles.html',
				controller: 'vehiclesController'
			});
		$stateProvider.state('Prices', {
				url: '/prices',
				templateUrl: '/prices.html',
				controller: 'pricesController'
			});
		$stateProvider.state('Cart', {
				url: '/cart',
				templateUrl: '/cart.html',
				controller: 'cartController'
			});
		$stateProvider.state('Contact', {
				url: '/contact',
				templateUrl: '/contact.html',
				controller: 'contactController'
			});
		$urlRouterProvider.otherwise('Login');
		$locationProvider.html5Mode(true);
}]);

app.factory('sidebarData', [function() {
	var sbArr=[
		{text: "Home", active: false, children: []},
		{text: "Vehicles", active: false, children: []},
		{text: "Prices", active: false, children: []},
		{text: "Cart", active: false, children: []},
		{text: "Contact", active: false, children: []}];

	return sbArr;
}]);

app.factory('classListData', function(classTeacherService, $rootScope) {
	return classTeacherService.query({teacher: $rootScope.current_user.username});
})

app.controller("sidebarController", function($scope, $state, sidebarData, $rootScope) {		
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
		$state.go(child.text,{},{reload:true});
	};

	$scope.setActiveParent=function(parent) {
		if(parent.children.length==0) {
			$scope.deActivateAll();
			parent.active=true;
			$state.go(parent.text,{},{reload:true});
		}
	};

	$scope.$on('logout', function(){
		$scope.deActivateAll();
	})

	$rootScope.homeBtn=function(){
		$state.go("Home");
	};

	$rootScope.vehiclesBtn=function(){
		var parent=document.getElementById('Vehicles-sidebar-button');
		if(!parent.getAttribute("aria-expanded")){
			$timeout(function(){
				parent.click();
			}, 0);
		}
		var parentAng=$scope.sidebarArr[1];
		$scope.setActiveParent(parentAng);
		$scope.setActiveChild(parentAng.children[0]);
	};

	$rootScope.pricesBtn=function(){
		var parent=document.getElementById('Prices-sidebar-button');
		if(!parent.getAttribute("aria-expanded")){
			$timeout(function(){
				parent.click();
			}, 0);
		}
		var parentAng=$scope.sidebarArr[2];
		$scope.setActiveParent(parentAng);
		$scope.setActiveChild(parentAng.children[0]);
	};

	$rootScope.cartBtn=function(){
		var parent=document.getElementById('Cart-sidebar-button');
		if(!parent.getAttribute("aria-expanded")){
			$timeout(function(){
				parent.click();
			}, 0);
		}
		var parentAng=$scope.sidebarArr[3];
		$scope.setActiveParent(parentAng);
		$scope.setActiveChild(parentAng.children[0]);
	};

	$rootScope.contactBtn=function(){
		var parent=document.getElementById('Contact-sidebar-button');
		if(!parent.getAttribute("aria-expanded")){
			$timeout(function(){
				parent.click();
			}, 0);
		}
		var parentAng=$scope.sidebarArr[4];
		$scope.setActiveParent(parentAng);
		$scope.setActiveChild(parentAng.children[0]);
	};

	$rootScope.accountForm={};
	//Change $rootScope.current_user to be similar to currentClass
	//So it holds the full object, not just the name.
	$rootScope.openAccount=function() {
		$rootScope.accountForm.fname=$rootScope.current_user.fname;
		$rootScope.accountForm.lname=$rootScope.current_user.lname;
		$rootScope.accountForm.email=$rootScope.current_user.email;
		$rootScope.accountForm.username=$rootScope.current_user.username;
		$rootScope.accountForm.fname=$rootScope.current_user.fname;
	}

	$rootScope.updateAccount=function(c) {
		$rootScope.current_user.fname=c.fname;
		$rootScope.current_user.lname=c.lname;
		$rootScope.current_user.email=c.email;
		$rootScope.current.username=c.username;
		//implement password checking here. copy isPassValid from login.js
		checkUserAvailService.update({username: $rootScope.current_user.username});
	}

	$rootScope.changePass=function() {
		let passTest = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
		// let a = testPass.match(validPass);
		var validPass=false;
		var validMatch=false;

		if(passTest.test($rootScope.accountForm.password)){
			validPass=true
			// document.getElementById("newPass").style = "border-right: 8px solid #00FF7F;";
			// document.getElementById("output3").innerHTML="";
		}
		else
			validPass=false;

		if($scope.validPass){
			if($rootScope.accountForm.password===$rootScope.accountForm.passMatch)
				validMatch=true;
			else
				validMatch=false;
		}

		if(validPass && validMatch){
			$rootScope.current_user.password=$rootScope.accountForm.password;
			changePasswordService.update({username: $rootScope.current_user.username});
		}
	}
});


app.factory('studentService', function($resource){
	return $resource('/api/studentList/:_id', { _id: '@_id' },
    {
        'update': { method:'PUT' }
    });
});

app.factory('studentByClassService', function($resource){
	return $resource('/api/studentList/class/:class', {},
    {
        'update': { method:'PUT' }
    });
});

app.factory('studentByGroupService', function($resource){
	return $resource('/api/studentList/group/:group', {},
    {
        'update': { method:'PUT' }
    });
});

app.factory('classService', function($resource){
	return $resource('/api/classList/:_id', { _id: '@_id' },
    {
        'update': { method:'PUT' }
    });
});

app.factory('classTeacherService', function($resource){
	return $resource('/api/classList/teacher/:teacher', {},
    {
        'update': { method:'PUT' }
    });
});

app.factory('groupService', function($resource){
	return $resource('/api/groupList/:_id', { _id: '@_id' },
    {
        'update': { method:'PUT' }
    });
});

app.factory('groupByClassService', function($resource){
	return $resource('/api/groupList/class/:class', {},
    {
        'update': { method:'PUT' }
    });
});

app.factory('loginService', function($resource){
	return $resource('/auth/login/:id', { _id: '@_id' },
    {
        'update': { method:'PUT' }
    });
});

app.factory('signupService', function($resource){
	return $resource('/auth/signup/:id', { _id: '@_id' },
    {
        'update': { method:'PUT' }
    });
});

app.factory('checkLoginService', function($resource){
	return $resource('/auth/isLoggedIn/:id', { _id: '@_id' },
    {
        'update': { method:'PUT' }
    });
});

app.factory('checkUserAvailService', function($resource){
	return $resource('/api/users/:username', { username: '@username' },
    {
        'update': { method:'PUT' }
    });
});

app.factory('changePasswordService', function($resource){
	return $resource('/api/users/password/:username', { username: '@username' },
    {
        'update': { method:'PUT' }
    });
});
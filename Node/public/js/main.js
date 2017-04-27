var app = angular.module("mainApp", ["ui.router", "ngResource"]).run(function($rootScope, $http, checkLoginService, $location, $state, changePasswordService){
	$rootScope.authenticated = false;
	$rootScope.current_user = "";
	$rootScope.currentClass = ""
	$rootScope.validPass=true;
	$rootScope.validMatch=true;

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
		$stateProvider.state('Admin', {
			url: '/admin',
			templateUrl: '/admin.html',
			controller: 'adminController'
		});
		$urlRouterProvider.otherwise('Login');
		$locationProvider.html5Mode(true);
}]);

app.factory('sidebarData', [function() {
	var sbArr=[
		{text: "Home", active: true, children: []},
		{text: "Vehicles", active: false, children: []},
		{text: "Prices", active: false, children: []},
		{text: "Cart", active: false, children: []},
		{text: "Contact", active: false, children: []}];

	return sbArr;
}]);

app.factory('classListData', function(classTeacherService, $rootScope) {
	return classTeacherService.query({teacher: $rootScope.current_user.username});
})

app.controller("sidebarController", function($scope, $state, sidebarData, $rootScope, changePasswordService) {		
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
		$scope.setActiveParent($scope.sidebarArr[0]);
	};

	$rootScope.vehiclesBtn=function(){
		$scope.setActiveParent($scope.sidebarArr[1]);
	};

	$rootScope.pricesBtn=function(){
		$scope.setActiveParent($scope.sidebarArr[2]);
	};

	$rootScope.cartBtn=function(){
		$scope.setActiveParent($scope.sidebarArr[3]);
	};

	$rootScope.contactBtn=function(){
		$scope.setActiveParent($scope.sidebarArr[4]);
	};

	$rootScope.adminBtn=function(){
		$scope.setActiveParent($scope.sidebarArr[0]);
		$state.go('Admin',{},{reload:true});
	}

	$rootScope.accountForm={};
	//Change $rootScope.current_user to be similar to currentClass
	//So it holds the full object, not just the name.
	$rootScope.openAccount=function() {
		$rootScope.accountForm.fname=$rootScope.current_user.fname;
		$rootScope.accountForm.lname=$rootScope.current_user.lname;
		$rootScope.accountForm.email=$rootScope.current_user.email;
		$rootScope.accountForm.phone=$rootScope.current_user.phone;
		$rootScope.accountForm.username=$rootScope.current_user.username;
		$rootScope.accountForm.fname=$rootScope.current_user.fname;
	}

	$rootScope.updateAccount=function(c) {
		$rootScope.current_user.fname=c.fname;
		$rootScope.current_user.lname=c.lname;
		$rootScope.current_user.email=c.email;
		$rootScope.current_user.phone=c.phone;
		$rootScope.current.username=c.username;
		//implement password checking here. copy isPassValid from login.js
		checkUserAvailService.update({username: $rootScope.current_user.username});
	}

	$rootScope.isPassValid = function(){
		let passTest = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

		if(passTest.test($rootScope.accountForm.password)){
			$rootScope.validPass=true
		}
		else
			$rootScope.validPass=false;

		if($rootScope.validPass){
			if($rootScope.accountForm.password===$rootScope.accountForm.passMatch){
				$rootScope.validMatch=true;
				return true;
			}
			else
				$rootScope.validMatch=false;
		}
	}

	$rootScope.changePass=function() {
		if($scope.isPassValid()){
			$rootScope.current_user.password=$rootScope.accountForm.password;
			changePasswordService.update($rootScope.current_user, function(res){
				$rootScope.current_user=res;
			});
		}
	}
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
	return $resource('/api/users/password/:_id', { _id: '@_id' },
    {
        'update': { method:'PUT' }
    });
});

app.factory('partService', function($resource){
	return $resource('/api/parts/:_id', { _id: '@_id' },
    {
        'update': { method:'PUT' }
    });
});

app.factory('orderService', function($resource){
	return $resource('/api/orders/:_id', { _id: '@_id' },
    {
        'update': { method:'PUT' }
    });
});

app.factory('userService', function($resource){
	return $resource('/api/users/:_id', { _id: '@_id' },
    {
        'update': { method:'PUT' }
    });
});
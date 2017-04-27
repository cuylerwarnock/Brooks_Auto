angular.module('mainApp')
	.controller("authenticationController", function($scope, $rootScope, $state, loginService, signupService, checkUserAvailService, userService) {
		// $scope.confPass="";
		// $scope.confEmail="";
		$scope.user = {username: '', password: ''};
		$scope.error_message = '';

		$scope.regFName="";
		$scope.regLName="";
		$scope.regEmail="";
		$scope.regPhone="";
		$scope.regUser="";
		$scope.regPass="";
		$scope.regPass2="";

		$scope.validEmail=true;
		$scope.validPhone=true;
		$scope.validUser=true;
		$scope.availUser=true;
		$scope.validPass=true;
		$scope.validMatch=true;

		$scope.isEmailValid = function() {
  			var emailTest = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  			if(emailTest.test($scope.regEmail)== true) 
  			{
  				// document.getElementById("email").style = "border-right: 8px solid #00FF7F;";
  				// document.getElementById("output2").innerHTML="";
  				$scope.validEmail = true;
  			}
  			else
  				$scope.validEmail=false
  			// else{
  			// 	document.getElementById("email").style = "border: 4px solid #CD5C5C;";
  			// 	document.getElementById("output2").innerHTML="- Invalid Email Address Syntax";
  			// 	emailReady = false;
  			// }
  			// if(testEmail == ""){
  			// 	document.getElementById("email").style = "border: 1px solid #d9d9d9; border-top: 1px solid #c0c0c0;";
  			// 	document.getElementById("output2").innerHTML="";
  			// 	emailReady = false;
  			// }
		};

		$scope.isPhoneValid = function(){
			$scope.validPhone = $scope.regPhone.match(/\d/g).length===10;
		}

		$scope.isPassValid = function(){
			
			//check password here, use above bools to set classes in HTML.
			//ex: class="valid-{{validPass}}"
			// let testPass = document.getElementById("newPass").value;
			let passTest = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;
			// let a = testPass.match(validPass);

			if(passTest.test($scope.regPass)){
				$scope.validPass=true
				// document.getElementById("newPass").style = "border-right: 8px solid #00FF7F;";
				// document.getElementById("output3").innerHTML="";
			}
			else
				$scope.validPass=false;

			if($scope.validPass){
				if($scope.regPass===$scope.regPass2)
					$scope.validMatch=true;
				else
					$scope.validMatch=false;
			}
		
			// else{
			// 	document.getElementById("newPass").style = "border: 4px solid #CD5C5C;";
			// 	document.getElementById("output3").innerHTML="- Invalid Password";
			// 	passReady = false;	
			// }
			
			//reimplement differently:
			// let confirm = document.getElementById("confPass").value;

			// if(confirm == testPass)
			// {
			// 	document.getElementById("output4").innerHTML="- Passwords Match";
			// 	document.getElementById("confPass").style = "border-right: 8px solid #00FF7F;";
			// }
			// else
			// {
			// 	document.getElementById("output4").innerHTML="- Passwords Do Not Match";
			// 	document.getElementById("confPass").style = "border: 4px solid #CD5C5C;";
			// 	passReady = false;	
			// }
			// if(testPass == ""){
			// 	document.getElementById("newPass").style = "border: 1px solid #d9d9d9; border-top: 1px solid #c0c0c0;";
			// 	document.getElementById("output3").innerHTML="";
			// 	passReady = false;	
			// }
			// if(confirm == ""){
  	// 			document.getElementById("confPass").style = "border: 1px solid #d9d9d9; border-top: 1px solid #c0c0c0;";
  	// 			document.getElementById("output4").innerHTML="";	
  	// 			passReady = false;	
			// }
			// if(validPass.test(testPass)==true && length >= 8 && confirm == testPass)
			// {
			// 	passReady = true;
			// }
		};

		$scope.login = function(username, password){
			$scope.user.username=username;
			$scope.user.password=password;
	    	loginService.save($scope.user, function(data){
	    		if(data.state == 'success'){
		    			$rootScope.authenticated = data.user;
			    		$rootScope.current_user = data.user;
			    		$state.go('Home');
	    		}
	    		else{
	    			$scope.error_message = data.message;
	    			$scope.availUser = false;
	    		}
	    	})
	  	};

	  	$scope.beginRegister = function(){
	  		$state.go('Signup');
	  		userService.query({}, function(res){
	  			//if no users exist, create admin account
	  			if(res.length===0){
	  				$state.go('Login');
	  				var admin={
			  			type: "admin",
			  			fname: "Brooks",
						lname: "Nuss",
						email: "",
						username: "admin",
						password: "adminTemp",
						phone: "",
						vehicles: [],
						cart: []
		  			};
		  			signupService.save(admin, function(data){
		  				$scope.login('admin', 'adminTemp');
		  			});
	  			}
	  		});
	  	}

	  	$scope.beginLogin = function(){
	  		$state.go('Login');
	  	}

	  	//maybe implement isUserAvail function using a service just to check
	  	//if we can findOne matching user in db, then use if(user) to return error
	  	//instead of relying on flash messages

	  	$scope.isUserAvailable = function(){
	  		$scope.availUser=checkUserAvailService.get({username: $scope.regUser}, function(res){
	  			$scope.availUser=res;
	  		});
	  	}

	  	$scope.register = function(){
	  		if($scope.validPass && $scope.validMatch && $scope.validEmail && $scope.validUser){
		  		$scope.user={
		  			type: "client",
		  			fname: $scope.regFName,
					lname: $scope.regLName,
					email: $scope.regEmail,
					username: $scope.regUser,
					password: $scope.regPass,
					phone: $scope.regPhone,
					vehicles: [],
					cart: []
		  		};
		    	signupService.save($scope.user, function(data){
		    		if(data.state == 'success'){
			    			$rootScope.authenticated = data.user;
				    		$rootScope.current_user = data.user;
				    		$state.go('Home');
		   			}
		    		else{
		    			$scope.error_message = data.message;
		    			console.log(data);
		    		}
		    	})
	    	}
	  	};

	  	$scope.bypass = function(){
	  		$scope.login("bn38","Hehexd123");
	  	};
	});
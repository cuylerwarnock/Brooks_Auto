class Validation {
	constructor(id, re, errorMsg) {
		this.id=id;
		this.re=re;
		this.errorMsg=errorMsg;
		this.nodeMsg=null; //html element to hold node containing errormsg
	}

	validate() {
		let input=this.id.value;
		let validResult=this.re.test(input);
		if(!validResult) {
			if(this.nodeMsg===null) { //display errormsg on screen
				this.id.style.backgroundColor="red";
				//add node to html. passing p means a <p> is created
				this.nodeMsg=document.createElement("p");
				this.nodeMsg.textContent=this.errorMsg;
				let parent=document.getElementById("signup");
				parent.insertBefore(this.nodeMsg, this.id);
			}
		}
		else {
			if(this.nodeMsg!==null) { //remove errmsg from screen
				let parent=document.getElementById("signup");
				parent.removeChild(this.nodeMsg);
				this.id.style.backgroundColor="white";
			} 
		}
		return validResult;
	}
}

function validateEmail() {
	let id=document.getElementById("email");
	// any # of non whitespace chars
	let re=/\S+@\S+\.\S+/;
	let v=new Validation(id, re, "Invalid Email");
	//blur is triggered when the element loses focus
	addEventListener("blur", function() {
		return v.validate();

		//closure: using v here. still in scope.
	})
}

function validatePwd() {
	let id=document.getElementById("pwd");
	//one upper, one lower, one digit, length>=8
	let re=/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/;

	let v=new Validation(id, re, "Invalid Password");
	//blur is triggered when the element loses focus
	addEventListener("blur", function() {
		return v.validate();

		//closure: using v here. still in scope.
	})
}
class Stone{
	constructor(n, h)
	{
		this.name=n;
		this.hardness=h;
	}

	toString()
	{
		return `${this.name} has ${this.hardness}<br>`;
	}
}

function demo9 () {
	// let ruby=new Stone("ruby", 9);
	// let diamond=new Stone("diamond", 10);
	// let topaz=new Stone("topaz", 8);
	// document.write(ruby.toString());
	// document.write(diamond.toString());
	// document.write(topaz.toString());

	// let car1=new Car("garbo", "wagon");
	// car1.accelerate();
	// // add brake() prototype function
	// // gives it to every car obj
	// Car.prototype.brake=function(s) {
	// 	this.speed-=s;
	// 	if(this.speed<0)
	// 		this.speed=0;
	// }
	// let car2=new Car("garbo", "wagon mkII");
	// car2.accelerate();
	// car2.accelerate();
	// car2.brake(20);
	// car1.brake(20);
	// document.write(car1.toString());
	// document.write(car2.toString());

	let p1=new Pizza("pepperoni", "pepperoni.jpg", 8.99, "Pepperoni Pizza");
	document.write(p1.showPizza());

}

function Car(make, model) {
	this.make=make;
	this.model=model;
	this.speed=0;
	// this.shift=function(gear) {
	// 	this.gear=gear;
	// }
	this.accelerate=function() {
		this.speed+=5;
	}
	this.toString=function() {
		return `${this.make} ${this.model} has speed ${this.speed}<br>`;
	}
}

class Pizza {

	constructor(n, i, p, d) {
		this.name=n;
		this.img=i;
		this.price=p;
		this.description=d;
	}

	toString() {
		return `${this.name} ${this.img} ${this.price} ${this.description}`;
	}

	showPizza() {
		return `
			<div class="row">
			<div class="col-md-2 text-center">
				<h3>${this.name}</h3>
			</div>
			<div class=col-md-2>
				<img class="pizza" src="./images/${this.img}" alt="pepperoni">
			</div>
			<div class="col-md-2 text-center">
				<h3>${this.price}</h3>
			</div>
			<div class="col-md-2">
				<button type="button" class="btn btn-primary">Remove</button>
			</div>
			</div>`;
	}
	
}
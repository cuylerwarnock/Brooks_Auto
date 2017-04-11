let pizzas=[
{name: "pepperoni", img: "pepperoni.jpg", price: 8.99},
{name: "chicken alfredo", img: "alfredo.jpg", price: 9.99},
{name: "everything", img: "everything.jpg", price: 10.99}
];

function addToCart(pId) {
	let cartJ=localStorage.getItem("cart");
	let cart;
	if (cartJ===null)
		cart=[];
	else
		cart=cartJ.split(",");
	cart.push(pId);
	let number=localStorage.getItem("number");
	if(number===null)
		number=0;
	document.getElementById("numItem").innerHTML=`${++number}`;
	localStorage.setItem("cart", cart.toString());
	localStorage.setItem("number", number);
}

function registButtonEvents(){
	let buttons=document.getElementsByTagName("button");
	for(let i=0; i<buttons.length-1; i++){
		buttons[i].addEventListener("click", function() {
			addToCart(i)}
		);
	}
	let number=localStorage.getItem("number");
	if (number===null)
		number=0;
	document.getElementById("numItem").innerHTML=number;
}

function clearCart(){
	localStorage.removeItem("cart");
	localStorage.removeItem("number");
	document.getElementById("numItem").innerHTML=0;
}

function showCart() {
	let cartJ=localStorage.getItem("cart");
	let cart=[];
	let info="";
	if(cartJ===null)
		document.getElementById("myCart").innerHTML="<h2>You have no items in the cart</h2>";
	else
	{
		let total=0;
		cart=cartJ.split(",");
		for(let i in cart){
			let item=pizzas[cart[i]];
			if (cart.length != 0)
				total+=item.price;
			else
				total=0;
			info+=`
			<div class="row">
			<div class="col-md-2 text-center">
				<h3>${item.name}</h3>
			</div>
			<div class=col-md-2>
				<img class="pizza" src="./images/${item.img}" alt="pepperoni">
			</div>
			<div class="col-md-2 text-center">
				<h3>${item.price}</h3>
			</div>
			<div class="col-md-2">
				<button type="button" class="btn btn-primary" onclick=removeCart(${i})>Remove</button>
			</div>
			</div>
		`;
		}
		total=total.toFixed(2);
		info+=`<h3>Total price: ${total}</h3>`;
		document.getElementById("myCart").innerHTML=info;
	}
}

function removeCart(x) {
	let cart=localStorage.getItem("cart");
	cart=cart.split(","),
	cart.splice(x, 1);
	if (cart.length == 0)
	{
		localStorage.removeItem("cart");
		localStorage.removeItem("number");
	}
	else
	{
		localStorage.setItem("cart", cart.toString());
		localStorage.setItem("number", cart.length);
	}
	showCart();
}
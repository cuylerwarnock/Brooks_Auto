// mouseover, double img size, mouse leave, half that (original size). click for img disappear
window.onload=function() {
	let pic=document.getElementById("img1");
	pic.onmouseover=function() {
		pic.height*=2;
		pic.width*=2;
	};
	pic.onmouseout=function() {
		pic.height/=2;
		pic.width/=2;
	};
	pic.onclick=function() {
		pic.style.visibility="hidden";
	};

	let paragraphs=document.getElementsByTagName("p");
	let divP=document.getElementById("showP");
	divP.innerHTML="Show all paragraphs again.<br>";
	for(let i=0;i<paragraphs.length;i++) {
		divP.innerHTML+=paragraphs[i].innerHTML+"<br>";
	}
}
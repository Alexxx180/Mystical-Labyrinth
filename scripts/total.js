function Hide(name) {
	let element = document.getElementById(name);
	element.style.visibility = "hidden";
}

function Show(name) {
	let element = document.getElementById(name);
	element.style.visibility = "visible";
}

function HideX(names) {
	for (let i = 0; i < names.length; i++) {
		Hide(names[i]);
	}
}

function ShowX(names) {
	for (let i = 0; i < names.length; i++) {
		Show(names[i]);
	}
}

function GetById(name) {
	return document.getElementById(name);
}

function SetBackGround(name, color) {
	return GetById(name).style.background = color;
}

function SetHeight(name, value) {
	return GetById(name).style.height = value;
}

function RGB(r, g, b, coef) {
	return 'rgb('+r*coef+','+g*coef+','+b*coef+')';
}
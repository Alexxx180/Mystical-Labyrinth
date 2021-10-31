KolKol = 900;

var X = 395;
var Y = 215;
var Fi = -Math.PI/2;

var pobedaKol = 78, pobedaStr = 34;
var pause = true;

var startTime = [1, 0];
var time = [startTime[0],  startTime[1]];
var timer;

function PoiskPoLuchu( n ) {
	var i,X1,Y1,NomKol,NomStr;
	Rez = [ -1,-1,500 ];
	for(i=0;i<500;i++){
		if (Rez[0]==-1) {
			X1 = X + i*Math.cos(Fi+n*2.0/KolKol-1);
			Y1 = Y + i*Math.sin(Fi+n*2.0/KolKol-1);
			NomKol = parseInt(X1/10);
			NomStr = parseInt(Y1/10);
			if ((NomStr>=0) && (NomStr<Karta.length)) {
				if ((NomKol>=0) && (NomKol<Karta[NomStr].length)) {
					if (Karta[NomStr][NomKol]!='.') {
						Rez[0] = NomKol;
						Rez[1] = NomStr;
						Rez[2] = i;
						};
					};
				};
			};
		};
	return Rez;
	};

function PokazScen() {
	var i,H,Kletka,k;
	for(i=0;i<KolKol;i++){
		Kletka = PoiskPoLuchu(i);
		if (Kletka[0]==-1) {
			document.getElementById('K'+i).style.background = 'rgb(0,0,0)';
			document.getElementById('K'+i).style.top = '490px';
			document.getElementById('K'+i).style.height = '20px';
			};
		if (Kletka[0]>-1) {
			H = 10/parseFloat(Kletka[2]); 
			k = parseInt(Karta[Kletka[1]][Kletka[0]]);
			document.getElementById('K'+i).style.background = 'rgb('+MapColors[k][0]*H+','+MapColors[k][1]*H+','+MapColors[k][2]*H+')';  
			document.getElementById('K'+i).style.top = 500-1000*H+'px';
			document.getElementById('K'+i).style.height = 2*1000*H+'px';
			};
		};
	};

function Step( n ) {
	var shag,X1,Y1,NomKol,NomStr;
	Rez = [ -1,-1,500 ];
	for(i=0;i<500;i++){
		if (Rez[0]==-1) {
			X1 = X + i*Math.cos(Fi+n*2.0/KolKol-1);
			Y1 = Y + i*Math.sin(Fi+n*2.0/KolKol-1);
			NomKol = parseInt(X1/10);
			NomStr = parseInt(Y1/10);
			if ((NomStr>=0) && (NomStr<Karta.length)) {
				if ((NomKol>=0) && (NomKol<Karta[NomStr].length)) {
					if (Karta[NomStr][NomKol]!='.') {
						Rez[0] = NomKol;
						Rez[1] = NomStr;
						Rez[2] = i;
						};
					};
				};
			};
		};
	return Rez;
}

function Svobodno(nomKol, nomStr) {
	var Rez = 1, i, k;
	for (i = nomStr - 1; i < nomStr + 1; i++) {
		for (k = nomKol - 1; k < nomKol + 1; k++) {
			if (Karta[i][k] != '.') { 
				Rez = 0;
			}
		}
	}
	
	return Rez;
}

function Pobeda(nomKol, nomStr) {
	var Rez = 0;
	if ((nomKol + 1 >= pobedaKol) && (nomStr + 2 >= pobedaStr)) {
		Rez = 1;
	}
	return Rez;
}

function Button1Click() {
	if (Button1.value == 'Играть') {
		document.getElementById('panel1').style.visibility = "hidden";
		Button1.value = 'Справка';
		Pause(false);
	} else {
		document.getElementById('panel1').style.visibility = "visible";
		Button1.value = 'Играть';
		Pause(true);
	}
}

function Button2Click() {
	if (pause)
		return;
	var X1,Y1, NomKol,NomStr;
	X1 = X + 10*Math.cos(Fi);
	Y1 = Y + 10*Math.sin(Fi);
	NomKol = parseInt(X1/10);
	NomStr = parseInt(Y1/10);
	if (Svobodno(NomKol, NomStr)) {
		X = X1;
		Y = Y1;
		if (Pobeda(NomKol, NomStr)) {
			document.getElementById('wonInfo').style.visibility = "visible";
		}
		}
	PokazScen();
	};

function Button3Click() {
	if (pause)
		return;
	Fi = Fi - 0.05;
	PokazScen();
}

function Button4Click() {
	if (pause)
		return;
	var X1,Y1, NomKol,NomStr;
	X1 = X - 10*Math.cos(Fi);
	Y1 = Y - 10*Math.sin(Fi);
	NomKol = parseInt(X1/10);
	NomStr = parseInt(Y1/10);
	if (Svobodno(NomKol, NomStr)) {
		X = X1;
		Y = Y1;
		}
	PokazScen();
}

function Button5Click() {
	if (pause)
		return;
	Fi = Fi + 0.05;
	PokazScen();
}

function Reload() {
	X = 395;
	Y = 215;
	document.getElementById('wonInfo').style.visibility = "hidden";
	document.getElementById('loseInfo').style.visibility = "hidden";
	time = [startTime[0],  startTime[1]];
	document.getElementById('Timer1').innerText = TimeText();
	document.getElementById('panel1').style.visibility = "visible";
	Button1.value = 'Играть';
	Pause(true);
	Fi = -Math.PI/2;
	PokazScen();
}

function Pause(b) {
	pause = b;
	if (!pause)
		timer = setTimeout(Timer, 1000);
} 

function Timer() {
	if (pause)
		return;

	if (time[1] <= 0)
	{
		if (time[0] > 0) {
			time[1] = 59;
			time[0]--;
		}
	}
	else
	time[1]--;
			
	document.getElementById('Timer1').innerText = TimeText();
	if (time[1] > 0)
		timer = setTimeout(Timer, 1000);
	else {
		document.getElementById('loseInfo').style.visibility = "visible";
	}
}


function Klav(Sender) {
	var code = Sender.keyCode;
	switch(code) {
		case 37:
			Button3Click();
			break;	
		case 38:
			Button2Click();
			break;	
		case 39:
			Button5Click();
			break;	
		case 40:
			Button4Click();
			break;	
		default:
			break;
	}
	Sender.preventDefault();
	Sender.returnValue = false;
}

function TimeText() {
	return time[0] + ':' + parseInt(time[1] / 10) + '' + (time[1] % 10);
}

function FormCreate() {
	var i,H;
	for(i=0;i<KolKol;i++){
		document.getElementById("Walls").innerHTML += '<div id="K'+i+'" style="position:absolute; left:'+(i*2)+'px; top:100px; width:2px; height:770px; background:rgb(200,100,100); "></div>';
	}
	document.getElementById("Timer1").innerText = TimeText();
	document.onkeydown = Klav;
	PokazScen();
}
//var time = 10;
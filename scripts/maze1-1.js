
KolKol = 900;

var X = 395;
var Y = 215;
var Fi = -Math.PI/2;

var pobedaKol = 78, pobedaStr = 34;
var pause = true;

var startTime = [1, 0];
var time = [startTime[0],  startTime[1]];
var timer;

Cvet = [ [255,0,0],[255,180,0],[255,255,0],[180,255,0],[0,255,0],[0,255,180],[0,255,255],[0,180,255],[0,0,255],[180,0,255] ];

Karta = [
	'11111111111111111111111111111111111111111111111111111111111111111111111111111111',
	'1.....1...........................0............................................1',
	'1.....2...........................0............................................1',
	'1.....2.....1000303011102.........0............................................1',
	'1.....1..........11............................................................1',
	'1................21....................................00000012310290000.......1',
	'1................30...........................1.....................3..........1',
	'1................21...........................0.....................2..........1',
	'1................12...........................0.....................3..........1',
	'1................11.......000100010001000100001.....................3..........1',
	'1.....7738..........................................010001..........200000112001',
	'1...................................................0...............8..........1',
	'1...................................................1...............8..........1',
	'1...................................................0..........................1',
	'1...................................................0..........................1',
	'110000022233333331....................000010010.....0..........................1',
	'1.....................................0.......0.....1..........................1',
	'1.....................................1.0.....1.....0..........................1',
	'1...............................1001000.0100100.....00100.....010010010010010010',
	'1...........34342553.5..............................0..........................1',
	'1....................3..............................0..........................1',
	'1....................3..............................0..........................1',
	'132.....1023.4......................................0..........................1',
	'1............3.......7..............................0..........................1',
	'1............455.5.7.7.....1.....01001001701001001001001.....0010010010001001000',
	'1..........................1......................4..........0.................1',
	'1..........................1......................4..........1.................1',
	'1..3.......42434.64........1......................3..........0.................1',
	'1..3.......................1......................3..........0.................1',
	'1..3.......................0......................3..........1.................1',
	'1..3.......................0.....99191111234......912007.....8...........1.....1',
	'1..3.......................0...............5.................6...........1111111',
	'1..5.......................1...............5.................4...........0.....1',
	'1..4...........1000303011102...............5.......................7.....0.....1',
	'1..........................................6.......................3............',
	'1..........................................7771102912..............2............',
	'1..................................................................4............',
	'1..................................................................6............',
	'1..................................................................7............',
	'11111111111111111111111111111111111111111111111111111111111111111111111111111111'
	];

function Rectangle ( X,Y,DX,DY, R1,G1,B1, R2,G2,B2 ) {
	var canvas = document.getElementById('Image1');
	var Image1Canvas = canvas.getContext('2d');
	Image1Canvas.beginPath();
	Image1Canvas.fillStyle =  'rgb('+R1+','+G1+','+B1+')';
	Image1Canvas.fillRect(X,Y,DX,DY);
	Image1Canvas.stroke();
	Image1Canvas.beginPath();
	Image1Canvas.lineWidth = 1;
	Image1Canvas.strokeStyle = 'rgb('+R2+','+G2+','+B2+')';
	Image1Canvas.strokeRect(X,Y,DX,DY);
	Image1Canvas.stroke();
	};

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
			document.getElementById('K'+i).style.background = 'rgb('+Cvet[k][0]*H+','+Cvet[k][1]*H+','+Cvet[k][2]*H+')';  
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
	};

//i < 0 || k >  || 

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
		document.getElementById('panel1').style.left = '-2000px';
		Button1.value = 'Справка';
		Pause(false);
	} else {
		document.getElementById('panel1').style.left = '15px';
		Button1.value = 'Играть';
		Pause(true);
	}
};

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
			document.getElementById('wonInfo').style.left = '0px';
		}
		}
	PokazScen();
	};

function Button3Click() {
	if (pause)
		return;
	Fi = Fi - 0.05;
	PokazScen();
	};

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
	};

function Button5Click() {
	if (pause)
		return;
	Fi = Fi + 0.05;
	PokazScen();
	};

function Reload() {
	X = 395;
	Y = 215;
	document.getElementById('wonInfo').style.left = '-2000px';
	document.getElementById('loseInfo').style.left = '-2000px';
	time = [startTime[0],  startTime[1]];
	document.getElementById('Timer1').innerText = TimeText();
	document.getElementById('panel1').style.left = '15px';
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
		document.getElementById('loseInfo').style.left = '0px';
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
		};
	document.getElementById("Timer1").innerText = TimeText();
	document.onkeydown = Klav;
	Rectangle(0,0,1800,1000, 0,0,0, 0,0,0);
	for(i=0;i<500;i++){
		H = (500-i)/1000; 
		Rectangle(0,     i,1800,1, 0,0,0, 255*H,255*H,255*H);
		Rectangle(0,1000-i,1800,1, 0,0,0, 100*H, 50*H,  0*H);
		};
	PokazScen();

	};
//var time = 10;
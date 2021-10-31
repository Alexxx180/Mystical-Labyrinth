WallColumns = 900;

var X = startX;
var Y = startY;
var Fi = -Math.PI/2;
var pause = true;

var time = [startTime[0],  startTime[1]];
var timer;

Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

Number.prototype.filter = function(min, max) {
  return this % (Math.abs(min) + max);
};

function WayByRay( n ) {
	let i, X1, Y1, col, row;
	result = [ -1, -1,500 ];
	for(i = 0; i < 500; i++){
		if (result[0]==-1) {
			let calc = Fi + n * 2.0 / WallColumns - 1;
			X1 = X + i * Math.cos(calc);
			Y1 = Y + i * Math.sin(calc);
			col = parseInt(X1/10);
			row = parseInt(Y1/10);
			if ((row >= 0) && (row < Map.length)) {
				if ((col>=0) && (col < Map[row].length)) {
					if (Map[row][col] != '.') {
						result[0] = row;
						result[1] = col;
						result[2] = i;
					}
				}
			}
		}
	}
	return result;
}

function RevealScene() {
	var i, Cell;
	for(i = 0; i < WallColumns; i++){
		Cell = WayByRay(i);
		if (Cell[0]==-1) {
			let name = 'K'+i;
			SetBackGround(name, 'rgb(0,0,0)');
			SetHeight(name, '1%');
		}
		if (Cell[0]>-1) {
			let H = 10/parseFloat(Cell[2]); 
			let cell = parseInt(Map[Cell[0]][Cell[1]]);
			let color = MapColors[cell];
			let name = 'K'+i;
			SetBackGround(name, RGB(color[0], color[1], color[2], H));
			SetHeight(name, (2 * 100 * H).clamp(0, 100)+'%');
		}
	}
}

function WayIsFree(col, row) {
	let result = 1, i, k;
	for (i = row - 1; i < row + 1; i++) {
		for (k = col - 1; k < col + 1; k++) {
			if (Map[i][k] != '.') { 
				result = 0;
			}
		}
	}
	return result;
}

function WinnerRoad(col, row) {
	let result = 0;
	if ((col + 1 >= wonCol) && (row + 2 >= wonRow)) {
		result = 1;
	}
	return result;
}

function Goals() {
	if (GoalsInfo.value == 'Play') {
		Hide('Goals');
		Show('Movement');
		GoalsInfo.value = 'Info';
		GoalsInfo.src = "images/Info.svg";
		Pause(false);
	} else {
		Show('Goals');
		Hide('Movement');
		GoalsInfo.value = 'Play';
		GoalsInfo.src = "images/Right.svg";
		Pause(true);
	}
}

function Forward() {
	var X1,Y1, col,row;
	X1 = X + 10 * Math.cos(Fi);
	Y1 = Y + 10 * Math.sin(Fi);
	col = parseInt(X1 / 10);
	row = parseInt(Y1 / 10);
	if (WayIsFree(col, row)) {
		X = X1;
		Y = Y1;
		if (WinnerRoad(col, row)) {
			Pause(true);
			Show('wonInfo');
		}
	}
	RevealScene();
}

function Backward() {
	var X1,Y1, col,row;
	X1 = X - 10 * Math.cos(Fi);
	Y1 = Y - 10 * Math.sin(Fi);
	col = parseInt(X1/10);
	row = parseInt(Y1/10);
	if (WayIsFree(col, row)) {
		X = X1;
		Y = Y1;
	}
	RevealScene();
}

function Rotate(degree) {
	Fi = (Fi + degree).filter(-Math.PI, Math.PI);
}

function RotateLeft() {
	Rotate(-0.0471);
	RevealScene();
}

function RotateRight() {
	Rotate(0.0471);
	RevealScene();
}

function Reload() {
	X = startX;
	Y = startY;
	HideX(['wonInfo', 'loseInfo', 'Movement']);
	time = [startTime[0],  startTime[1]];
	GetById('Timer1').innerText = TimeText();
	Show('Goals');
	GoalsInfo.value = 'Играть';
	GoalsInfo.src = "images/Right.svg";
	Pause(true);
	Fi = -Math.PI/2;
	RevealScene();
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
			
	GetById('Timer1').innerText = TimeText();
	if (time[1] > 0)
		timer = setTimeout(Timer, 1000);
	else {
		Show('loseInfo');
	}
}


function KeyBoardInput(Sender) {
	if (pause)
		return;
	var code = Sender.keyCode;
	switch(code) {
		case 37:
		case 65:
			RotateLeft();
			break;	
		case 38:
		case 87:
			Forward();
			break;	
		case 39:
		case 68:
			RotateRight();
			break;	
		case 40:
		case 83:
			Backward();
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
	for(i=0;i<WallColumns;i++){
		GetById("Walls").innerHTML += '<div class="self-center" id="K'+i+'" style="grid-column: '+(i+1)+'; width: 100%; height: 100%;"></div>';
	}
	GetById("Timer1").innerText = TimeText();
	GetById('Up').ontouchstart  = Forward;
	GetById('Left').ontouchstart  = RotateLeft;
	GetById('Right').ontouchstart  = RotateRight;
	GetById('Down').ontouchstart  = Backward;
	document.onkeydown = KeyBoardInput;
	RevealScene();
}
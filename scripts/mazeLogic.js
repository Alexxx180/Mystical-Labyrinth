WallColumns = 300;

var X = startX;
var Y = startY;
var Fi = -Math.PI/2;
var pause = true;

var time = [startTime[0],  startTime[1]];
var timer;

var repeatTimer = false;
var repeatDuration = 50;

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
	if ((col >= wonCol - 2) && (col < wonCol + 2)
		&& (row >= wonRow - 2) && (row < wonRow + 2)) {
		result = 1;
	}
	return result;
}

function Goals() {
	if (Start.value == 'Play') {
		ShowX(['Up','Left','Down','Right']);
		Start.value = 'Info';
		Start.src = "images/Info.svg";
		Pause(false);
	} else {
		HideX(['Up','Left','Down','Right']);
		Start.value = 'Play';
		Start.src = "images/Right.svg";
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
	if (time[1] > 0 || time[0] > 0)
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

function ClearMove(event) {
	if (repeatTimer)
	{
		clearInterval(repeatTimer);
		repeatTimer = false;
	}
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
    event.returnValue = false;
    return false;
}

function ForwardRepeat(event) {
	if (!repeatTimer)
        repeatTimer = setInterval(Forward, repeatDuration);
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
    event.returnValue = false;
    return false;
}

function LeftRepeat(event) {
    if (!repeatTimer)
        repeatTimer = setInterval(RotateLeft, repeatDuration);
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
    event.returnValue = false;
    return false;
}

function RightRepeat(event) {
    if (!repeatTimer)
        repeatTimer = setInterval(RotateRight, repeatDuration);
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
    event.returnValue = false;
    return false;
}

function BackwardRepeat(event) {
    if (!repeatTimer)
        repeatTimer = setInterval(Backward, repeatDuration);
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
    event.returnValue = false;
    return false;
}

function SetMovementEvents() {
    GetById('Up').addEventListener('touchstart', ForwardRepeat);
	GetById('Up').addEventListener('mousedown', ForwardRepeat);
	GetById('Left').addEventListener('touchstart', LeftRepeat);
	GetById('Left').addEventListener('mousedown', LeftRepeat);
	GetById('Right').addEventListener('touchstart', RightRepeat);
	GetById('Right').addEventListener('mousedown', RightRepeat);
	GetById('Down').addEventListener('touchstart', BackwardRepeat);
	GetById('Down').addEventListener('mousedown', BackwardRepeat);
}

function SetClearEvent(elements) {
    for(let i = 0; i < elements.length; i++) {
		GetById(elements[i]).addEventListener('touchend', ClearMove);
        GetById(elements[i]).addEventListener('touchmove', ClearMove);
        GetById(elements[i]).addEventListener('mouseup', ClearMove);
        GetById(elements[i]).addEventListener('mousemove', ClearMove);
        GetById(elements[i]).oncontextmenu = NoContextMenu;
	}
}

function NoContextMenu(event)
{
    event.preventDefault();
    event.stopPropagation();
    event.cancelBubble = true;
    event.returnValue = false;
    return false;
}

function FormCreate() {
	for(let i = 0; i < WallColumns; i++) {
        let block = 'class="self-center"';
        let style = 'style="grid-column: '+(i+1)+'; width: 100%; height: 100%;"';
        
		GetById("Walls").innerHTML += '<div id="K'+i+'" '+block+' '+style+'></div>';
	}
	GetById("Timer1").innerText = TimeText();
    
    SetMovementEvents();
    SetClearEvent(['Up','Left','Down','Right']);
    
	document.onkeydown = KeyBoardInput;
	RevealScene();
}

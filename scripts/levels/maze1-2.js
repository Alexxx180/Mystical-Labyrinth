var startX = 395;
var startY = 215;
var wonCol = 35;
var wonRow = 38;

var startTime = [1, 20];

Map = [
    '11111111111111111111111111111111111111111111111111111111111111111111111111111111', // 0
	'1.................................0...0.................3......................1', // 1
	'1.................................0...0........................................1', // 2
	'1.................................0...0.......0................................1', // 3
	'1.....1.....1000303011102.............0.......2.....................3..........1', // 4
	'1.....1...........1...................0.......1........00000012310290000.......1', // 5
	'1.....0...........0...................0.......1.....................3..........1', // 6
	'1.....0...........1...........045511110.......0.....................2..........1', // 7
	'1.....000000......2...........0.......111111111.....................3..........1', // 8
	'1..........0......1.......000100.....00.............................3..........1', // 9
	'1..........0......1...................2.............................20000011..01', // 10
	'1..........0......1...................2......10111.111000001000000018..........1', // 11
	'1..........1......0...................2......1......................8..........1', // 12
	'11111......1......1.............0............1.................................1', // 13
	'1...........000000000000000000000............1......0....................0.....1', // 14
	'110000...........1..................................0..........1.........00....1', // 15
	'1................1..................................1..........1...............1', // 16
	'1................1..................................0..........1...............1', // 17
	'1................1.............01001.....100100.....00100.....010010010010010010', // 18
	'1.....00000134342553.5.........0...1.....0..........0..........................1', // 19
	'1.....................3000.00.00...1.....0..........0..........................1', // 20
	'1..................................1.....0..........0..........................1', // 21
	'132.....1023.4.....................1.....0..........0..........................1', // 22
	'1............3.....................1.....0..........0..........................1', // 23
	'1............4...................010.1101701001001001001.....0010010010001001000', // 24
	'1............5555111100000............1...........4..........0.................1', // 25
	'1.................................................4..........1.................1', // 26
	'1.................................................3..........0.................1', // 27
	'1..........................1......................3..........0.....000001......1', // 28
	'1.....100000000000000......0................0000003..........1..........1......1', // 29
	'1....2.....................0.....99.......34......912007.....8..........11000001', // 30
	'1...6......................0......1........5.................6.................1', // 31
	'1..5.......................1......1........5.................4.................1', // 32
	'1.4...........11000303011102......11.2200005.......................71..00......1', // 33
	'1.............0............11111000........6.......................3....00.....1', // 34
	'1......11110100.................1..........7771102912..............2.....0.....1', // 35
	'1...................................................1..........................1', // 36
	'1....................1..............................1.....222............0.....1', // 37
	'1....................0..............................1....................0.....1', // 38
	'11111111111111111111111111111111111.....1111111111111111111111111111111111111111'  // 39
	];
//   ..........1.........2.........3.........4.........5.........6.........7.........
//   0.2.4.6.8.0.2.4.6.8.0.2.4.6.8.0.2.4.6.8.0.2.4.6.8.0.2.4.6.8.0.2.4.6.8.0.2.4.6.8.
//   .1.3.5.7.9.1.3.5.7.9.1.3.5.7.9.1.3.5.7.9.1.3.5.7.9.1.3.5.7.9.1.3.5.7.9.1.3.5.7.9
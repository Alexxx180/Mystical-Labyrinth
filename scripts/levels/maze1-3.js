var startX = 395;
var startY = 215;
var wonCol = 3;
var wonRow = 1;

var startTime = [1, 45];

Map = [
    '1.....11111111111111111111111111111111111111111111111111111111111111111111111111', // 0
	'1.....................................0.................3......................1', // 1
	'1.....................................0........................................1', // 2
	'1.....1...............................0.......0................................1', // 3
	'1.....1.....1000303011102.....................2.....................3..........1', // 4
	'1.....1...........1...........................1....111100110012310290000.......1', // 5
	'1.....0...........0...........................1....0.....0..........3..........1', // 6
	'1.....0...........1...........................0....0.....0..........2..........1', // 7
	'1.....000000......2...........01111111111111111....0................3..........1', // 8
	'1..........0......1.......00010.0....00........00000................3..........1', // 9
	'1..........0......1.............0.....20000000......................20000011..01', // 10
	'1.....000000......1.............0.........1..............001000000018..........1', // 11
	'1..........1......0.............0.........1.........................8..........1', // 12
	'1..........1......1.............0.........1....................................1', // 13
	'1...........00000000000000000000000.......1.........0..........................1', // 14
	'110000...........1................1.................0.....1111100000001111000001', // 15
	'1................1................1.................1..........1...............1', // 16
	'1................1................1.................0..........1...............1', // 17
	'1................1.............01001211001001001111100.........................0', // 18
	'1.....00000134342553.5.........0...1................0..........................1', // 19
	'1.....................3000.00.00...1................0.11111111111111.00000.....1', // 20
	'1..................................1................0..........................1', // 21
	'132................................1................0..........................1', // 22
	'1.111..1111113.....................1................0..........................1', // 23
	'1............4...................010111017010.....001001.....0010010010001001000', // 24
	'1............5555111100000............1...........4..........0.................1', // 25
	'1.....................................1...........4..........1.................1', // 26
	'1.....................................1...........3..........0.................1', // 27
	'1..........................1..........1...........3.......1110.....000001......1', // 28
	'1.....100000000000000......0..........1......000003.......0.............1......1', // 29
	'1.....1....................0.....99...1...........9.......0.............11000001', // 30
	'1000110....................0......1...1...........0.......0....................1', // 31
	'1..........................1......1...0...........0.......0....................1', // 32
	'1.............11000303011102......11.20000051.....0............................1', // 33
	'1.............0............11111000.........1.....1......................0.....1', // 34
	'1......11110100.................0...........1.....91211111111.00000..11111.....1', // 35
	'1..............................................................................1', // 36
	'1....................1.........................................................1', // 37
	'1....................0.........................................................1', // 38
	'11111111111111111111111111111111111111111111111111111111111111111111111111111111'  // 39
	];
//   ..........1.........2.........3.........4.........5.........6.........7.........
//   0.2.4.6.8.0.2.4.6.8.0.2.4.6.8.0.2.4.6.8.0.2.4.6.8.0.2.4.6.8.0.2.4.6.8.0.2.4.6.8.
//   .1.3.5.7.9.1.3.5.7.9.1.3.5.7.9.1.3.5.7.9.1.3.5.7.9.1.3.5.7.9.1.3.5.7.9.1.3.5.7.9
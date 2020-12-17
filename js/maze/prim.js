function doPrim() {
	var walls = [];

	clearBoard();

	fillWalls();
	drawBoard();

	var firstCell = pickInitialCell();
	walls = addToWallList(firstCell, walls);
	while (walls.length != 0) {
		var randomWallIndex = getRandom(0, walls.length - 1);
		walls = checkWall(walls[randomWallIndex], walls);
		walls.splice(randomWallIndex, 1);
		drawBoard();
	}
}

function getRandom(starting, ending) {
	return Math.floor(Math.random() * ending + starting);
}

function pickInitialCell() {
	var randX = currSX,
		randY = currSY;
	while (randX == currSX || randX == currEX) {
		randX = getRandom(0, ROWS - 1);
	}
	while (randY == currSY || randY == currEY) {
		randY = getRandom(0, COLS - 1);
	}

	return [randX, randY];
}

function addToWallList(cell, walls) {
	var x = cell[0];
	var y = cell[1];
	if (x > 0 && x < ROWS) {
		if (checkWallState(x - 1, y, "wall")) {
			walls.push(board[x - 1][y]);
		}
		if (checkWallState(x + 1, y, "wall")) {
			walls.push(board[x + 1][y]);
		}
	}
	if (y > 0 && y < COLS) {
		if (checkWallState(x, y - 1, "wall")) {
			walls.push(board[x][y - 1]);
		}
		if (checkWallState(x, y + 1, "wall")) {
			walls.push(board[x][y + 1]);
		}
	}

	return walls;
}

function fillWalls() {
	for (var i = 0; i < ROWS; i++) {
		for (var j = 0; j < COLS; j++) {
			if (board[i][j].state == "empty") {
				updateBoard(i, j, "wall");
			}
		}
	}
}

function checkWallState(x, y, state) {
	if (board[x][y].state == state) {
		return true;
	} else {
		return false;
	}
}

function checkWall(wall, walls) {
	var x = wall.x;
	var y = wall.y;
	var offsetX = 0,
		offsetY = 0;
	var emptyCount = 0;
	if (x > 0 && x < ROWS) {
		if (checkWallState(x - 1, y, "empty")) {
			emptyCount += 1;
			offsetX = 1;
			offsetY = 0;
		}
		if (checkWallState(x + 1, y, "empty")) {
			emptyCount += 1;
			offsetX = -1;
			offsetY = 0;
		}
	}
	if (y > 0 && y < COLS) {
		if (checkWallState(x, y - 1, "empty")) {
			emptyCount += 1;
			offsetX = 0;
			offsetY = 1;
		}
		if (checkWallState(x, y + 1, "empty")) {
			emptyCount += 1;
			offsetX = 0;
			offsetY = -1;
		}
	}

	if (emptyCount < 2) {
		x += offsetX;
		y += offsetY;
		updateBoard(x, y, "empty");
		x += offsetX;
		y += offsetY;
		updateBoard(x, y, "empty");
		walls = addToWallList(board[x][y], walls);
	}

	return walls;
}

// function doPrim() {
// 	clearPath();
// 	for (var i = 0; i < ROWS; i++) {
// 		for (var j = 0; j < COLS; j++) {
// 			board[i][j].state = "wall";
// 		}
// 	}
// 	//drawTable();

// 	board[currSX][currSY].state = "start";
// 	board[currEX][currEY].state = "end";
// 	var wallList = [];

// 	board[currSX][currSY].state = "empty";
// 	wallList = wallList.concat(getWallNeighbors(board[currSX][currSY]));
// 	while (wallList && wallList.length) {
// 		var rand = getRandom(0, wallList.length - 1);
// 		var currentWall = wallList[rand];

// 		var numCon = checkConnections(currentWall);
// 		if (numCon != 2) {
// 			board[currentWall.x][currentWall.y].value = 0;
// 			drawWall(convertCoordToString(currentWall.x, currentWall.y));
// 			//wait sleep(100000);
// 			connectWall(currentWall);

// 			wallList = wallList.concat(getWallNeighbors(currentWall));
// 		}
// 		wallList.splice(rand, 1);
// 	}

// 	board[currSX][currSY].state = "start";
// 	board[currEX][currEY].state = "end";
// 	var rand1 = 0;
// 	var rand2 = 0;
// 	while (rand1 == 0) {
// 		rand1 = getRandom(-1, 1);
// 	}
// 	while (rand2 == 0) {
// 		rand2 = getRandom(-1, 1);
// 	}
// 	checkEndPoint(rand1, rand2);

// 	drawTable();
// }
// function connectWall(wall) {
// 	var x = 0;
// 	var y = 0;

// 	if (wall.x == wall.sourcex) {
// 		if (wall.y > wall.sourcey) {
// 			board[wall.x][wall.y - 1].value = 0;
// 			drawWall(convertCoordToString(wall.x, wall.y - 1));
// 		} else {
// 			board[wall.x][wall.y + 1].value = 0;
// 			drawWall(convertCoordToString(wall.x, wall.y + 1));
// 		}
// 	} else if (wall.y == wall.sourcey) {
// 		if (wall.x > wall.sourcex) {
// 			board[wall.x - 1][wall.y].value = 0;
// 			drawWall(convertCoordToString(wall.x - 1, wall.y));
// 		} else {
// 			board[wall.x + 1][wall.y].value = 0;
// 			drawWall(convertCoordToString(wall.x + 1, wall.y));
// 		}
// 	}
// 	if (board[wall.x + x][wall.y + y].value == 1) {
// 		board[wall.sourcex][wall.sourcey].value = 0;
// 		drawWall(convertCoordToString(wall.sourcex, wall.sourcey));
// 	}
// }

// function getRandom(starting, ending) {
// 	return Math.floor(Math.random() * ending + starting);
// }
// function checkEndPoint(randx, randy) {
// 	var cell = board[currEX][currEY];
// 	var count = 0;
// 	var value = 4;
// 	var x = currEX;
// 	var y = currEY;
// 	if (x == 0 && y == 0) {
// 		value = 2;
// 		if (randx == 1) {
// 			randx = 0;
// 			randy = 1;
// 		} else {
// 			randx = -1;
// 			randy = 0;
// 		}
// 	} else if (x == 0 && y == COLS - 1) {
// 		if (randx == 1) {
// 			randx = 1;
// 			randy = 0;
// 		} else {
// 			randx = 0;
// 			randy = -1;
// 		}
// 		value = 2;
// 	} else if (x == ROWS - 1 && y == 0) {
// 		if (randx == 1) {
// 			randx = -1;
// 			randy = 0;
// 		} else {
// 			randx = 0;
// 			randy = 1;
// 		}
// 		value = 2;
// 	} else if (x == ROWS - 1 && y == COLS - 1) {
// 		if (randx == 1) {
// 			randx = 0;
// 			randy = 1;
// 		} else {
// 			randx = -1;
// 			randy = 0;
// 		}
// 		value = 2;
// 	} else if (x == 0 || x == ROWS - 1 || y == 0 || y == COLS - 1) {
// 		value = 3;
// 	}
// 	if (x >= 1) {
// 		if (board[x - 1][y].state === "wall") {
// 			count++;
// 		}
// 	}
// 	if (x <= ROWS - 3) {
// 		if (board[x + 1][y].state === "wall") {
// 			count++;
// 		}
// 	}
// 	if (y >= 1) {
// 		if (board[x][y - 1].state === "wall") {
// 			count++;
// 		}
// 	}
// 	if (y <= COLS - 3) {
// 		if (board[x][y + 1].state === "wall") {
// 			count++;
// 		}
// 	}
// 	if (count == value) {
// 		board[cell.x + randx][cell.y + randy].state = "empty";
// 	}
// }
// function checkConnections(wall) {
// 	var x = wall.x;
// 	var y = wall.y;
// 	var count = 0;
// 	if (board[x][y].end != "start" && board[x][y].state != "end") {
// 		if (x >= 2) {
// 			if (board[x - 2][y].state == "empty") {
// 				count++;
// 			}
// 		}
// 		if (x <= ROWS - 3) {
// 			if (board[x + 2][y].state == "empty") {
// 				count++;
// 			}
// 		}
// 		if (x <= y >= 2) {
// 			if (board[x][y - 2].state == "empty") {
// 				count++;
// 			}
// 		}
// 		if (y <= COLS - 3) {
// 			if (board[x][y + 2].state == "empty") {
// 				count++;
// 			}
// 		}
// 	}
// 	if (count == 2) {
// 		return true;
// 	} else {
// 		return false;
// 	}
// }

// function getWallNeighbors(cell) {
// 	var x = cell.x;
// 	var y = cell.y;
// 	var wallNeighbors = [];
// 	if (x >= 2) {
// 		if (board[x - 2][y].state === "wall") {
// 			board[x - 2][y].sourcex = x;
// 			board[x - 2][y].sourcey = y;
// 			wallNeighbors.push(board[x - 2][y]);
// 		}
// 	}
// 	if (x <= ROWS - 3) {
// 		if (board[x + 2][y].state === "wall") {
// 			board[x + 2][y].sourcex = x;
// 			board[x + 2][y].sourcey = y;
// 			wallNeighbors.push(board[x + 2][y]);
// 		}
// 	}
// 	if (y >= 2) {
// 		if (board[x][y - 2].state === "wall") {
// 			board[x][y - 2].sourcex = x;
// 			board[x][y - 2].sourcey = y;
// 			wallNeighbors.push(board[x][y - 2]);
// 		}
// 	}
// 	if (y <= COLS - 3) {
// 		if (board[x][y + 2].state === "wall") {
// 			board[x][y + 2].sourcex = x;
// 			board[x][y + 2].sourcey = y;
// 			wallNeighbors.push(board[x][y + 2]);
// 		}
// 	}

// 	return wallNeighbors;
// }

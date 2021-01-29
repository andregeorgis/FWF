import { Cell } from "./cell.js";
import { Grid } from "./grid.js";


//var cells = [];

// Backend grid
var grid_length = 10;
var grid = new Grid(grid_length);

// A grid of arrays of length 2 for number of neighbours for each player
var neighbourGrid = Array.apply(null, Array(10)).map(x => Array.apply(null, Array(10)).map(y => [0, 0]))

// Current player info
var player = 0;
var playerColours = ["#E71D36", "#2EC4B6"]


function createGrid(rows, cols) {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            createCell(i, j);
        }
    }
}

function createCell(row, col) {
    // Frontend cell
    var gridContainer = document.getElementById("grid-container");
    var cell = document.createElement("div");
    cell.className = "cell";
    cell.id = `i${row}_${col}`;
    cell.addEventListener("click", selectCell);
    gridContainer.appendChild(cell);

    // Backend cell
    var newCell = new Cell(cell);
    grid.addCell(row, col, newCell);
}

function selectCell(event) {
    var clickedCell = event.target;
    var bindedCell = grid.getCell(clickedCell.id);

    // Update current cell
    if (bindedCell.isBlank() || bindedCell.getPlayer() == player)
        updateCell(bindedCell);
}

function updateCell(cell) {
    var coords = cell.getCoord()
    updateNeighbour(coords[0], coords[1], player, cell.isBlank() ? 1 : -1)
    // console.log(neighbourGrid)

    var cellStyle = cell.element.style;

    if (cell.isBlank()) {
        cell.activate(player);
        cellStyle.backgroundColor = `${playerColours[player]}`;
    }
    else {
        cell.deactivate();
        cellStyle.backgroundColor = "transparent";
    }
}

function updateNeighbour(row, col, index, change) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if ((i == 0 && j == 0) || !grid.isValidCoord(row + i, col + j))
                continue

            neighbourGrid[row + i][col + j][index] += change;
        }
    }
}

function nextPlayer() {
    player = (player + 1) % 2;
    var button = document.getElementById("next-player");
    button.style.backgroundColor = `${playerColours[player]}`;
    //console.log(button.style.backgroundColor)
}

function nextGeneration() {
    // Make a copy of the neighbour grid
    var neighbourGridCopy = neighbourGrid.map(x => x.map(y => [...y]))

    for (let i = 0; i < grid.getLength(); i++) {
        for (let j = 0; j < grid.getLength(); j++) {
            // Get cell
            var currId = `i${i}_${j}`;
            var currCell = grid.getCell(currId)

            // Get number of active neighbours
            var playerOneNum = neighbourGridCopy[i][j][0];
            var playerTwoNum = neighbourGridCopy[i][j][1];
            var totalNum = playerOneNum + playerTwoNum;

            if (currCell.isBlank()) {
                if (totalNum != 3)
                    continue

                var temp = playerOneNum > playerTwoNum ? 0 : 1
                updateNeighbour(i, j, temp, currCell.isBlank() ? 1 : -1)
                currCell.activate(temp);
                currCell.element.style.backgroundColor = `${playerColours[temp]}`;
            }
            else {
                switch (totalNum) {
                    case 2:
                    case 3:
                        break;
                    default:
                        updateNeighbour(i, j, currCell.getPlayer(), currCell.isBlank() ? 1 : -1);
                        currCell.deactivate();
                        currCell.element.style.backgroundColor = "transparent";
                        break;
                }
            }
        }
    }
}

//function getCell(id) {

    while (turns >= 0) {
        // Constructing a temporary grid to store new generation

        //var tempGrid = new Array(5);
        //for (var i = 0; i < 5; i++) {
        //    tempGrid[i] = new Array(5);
        //}

        var tempGrid = grid.grid.slice();
        console.log(tempGrid);




        for (var row = 0; row < 5; row++) {
            for (var col = 0; col < 5; col++) {

                for (var i = -1; i < 2; i++) {
                    for (var j = -1; j < 2; j++) {
                        if (row + i < 0 || row + i >= 5) {continue;}
                        if (col + j < 0 || col + j >= 5) {continue;}

                        if ( i != 0 || j != 0 ) {
                            //console.log(row+i,col+j);
                            var cell = grid.getCell( (row + i).toString() + "," + (col + j).toString() );
                            if (cell.element.style.backgroundColor == "red") {p1Counter++;}
                            else if (cell.element.style.backgroundColor == "blue") {p2Counter++;}
                        }
                    }
                }
                total = p1Counter + p2Counter;
                console.log(total);
                if ( cell.getStatus() == true && (total <= 1 || total >= 4) ) {
                    changeColour(tempGrid[row][col], "transparent")
                }
                else if ( cell.getStatus() == false && total == 3 ) {
                    if (p1Counter > p2Counter) {changeColour(cell, "red");}
                    else {changeColour(tempGrid[row][col], "blue");}
                }
                total = 0;
                p1Counter = 0;
                p2Counter = 0;
            }
        }


createGrid(10, 10);
document.getElementById("next-player").addEventListener("click", nextPlayer)
document.getElementById("next-generation").addEventListener("click", nextGeneration)
document.getElementById("next-player").style.backgroundColor = `${playerColours[player]}`

import { Cell } from "./cell.js";
import { Grid } from "./grid.js";


//var cells = [];

// Backend grid
var grid_length = 10;
var grid = new Grid(grid_length);

// A grid of arrays of length 2 for number of neighbours for each player
var neighbourGrid = Array.apply(null, Array(10)).map(x => Array.apply(null, Array(10)).map(x => [0, 0]))

// Current player info
var player = 0;
var playerColours = ["red", "blue"]


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
    cell.id = `${row},${col}`;
    cell.addEventListener("click", selectCell);
    gridContainer.appendChild(cell);

    // Backend cell
    var newCell = new Cell(cell);
    grid.addCell(row, col, newCell);
    //cells.push(newCell);
}

function selectCell(event) {
    var clickedCell = event.target;
    var bindedCell = grid.getCell(clickedCell.id);

    // Update current cell
    if (bindedCell.isBlank() || bindedCell.getPlayer() == player)
        updateCell(bindedCell, playerColours[player]);
}

function updateCell(cell, colour) {
    var coords = cell.getCoord()
    updateNeighbours(coords[0], coords[1], cell.isBlank() ? 1 : -1)
    // console.log(neighbourGrid)

    var cellStyle = cell.element.style;

    if (cell.isBlank()) {
        cell.activate(player);
        cellStyle.backgroundColor = `${colour}`;
    }
    else {
        cell.deactivate();
        cellStyle.backgroundColor = "transparent";
    }
    //console.log(cellStyle.backgroundColor);
    //console.log(cell.getPlayer());
}

function updateNeighbours(row, col, change) {
    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if ((i == 0 && j == 0) || !grid.isValidCoord(row + i, col + j))
                continue

            neighbourGrid[row + i][col + j][player] += change;
        }
    }
}

function nextPlayer() {
    player = (player + 1) % 2;
    var button = document.getElementById("next-player")
    button.style.backgroundColor = `${playerColours[player]}`
    //console.log(button.style.backgroundColor)
}

// function nextGeneration() {
//
// }

//function getCell(id) {

    /*for (cell of cells) {
        if (cell.id == id) {
            return cell;
        }
    }*/

    //var idx = id.indexOf(",");
    //var cellIdx = (parseInt(id.slice(0, idx)) * 10) + (parseInt(id.slice(idx + 1)));
    //return cells[cellIdx];
//}

createGrid(10, 10);
document.getElementById("next-player").addEventListener("click", nextPlayer)
// document.getElementById("next-generation").addEventListener("click", nextGeneration)
document.getElementById("next-player").style.backgroundColor = `${playerColours[player]}`

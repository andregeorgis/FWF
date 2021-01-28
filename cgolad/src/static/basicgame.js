import { Cell } from "./cell.js";
import { Grid } from "./grid.js";


//var cells = [];
var grid_length = 10;
var grid = new Grid(grid_length);
var neighbourGrid = Array(grid_length).map(x => Array(grid_length)); // 2d grid
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
    var cellStyle = cell.element.style;

    if (cellStyle.backgroundColor != `${colour}`) {
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

function nextPlayer() {
    player=(player+1)%2;
    var button = document.getElementById("next-player")
    console.log(button.style.backgroundColor)
    button.style.backgroundColor = `${playerColours[player]}`
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

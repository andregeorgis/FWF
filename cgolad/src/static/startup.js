import { playerColours, grid_length, grid, selectCell, nextPlayer, nextGeneration } from "./setup.js";
import { Cell } from "./cell.js";

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

// Common for all stages
createGrid(grid_length, grid_length);

// Stage One
var stage_one = document.getElementById("stage-one");

if (stage_one) {
    console.log("hi")
    document.getElementById("next-player").addEventListener("click", nextPlayer);
    document.getElementById("next-generation").addEventListener("click", nextGeneration);
}

// Stage Two
var stage_two = document.getElementById("stage-two");

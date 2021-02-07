import { game, selectCell, nextPlayer, nextGeneration } from "./event_bridge.js";
import { GRID_LENGTH, STAGE_ONE } from "./constants.js"

// Sets up the grid
function createGrid(rows, cols) {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = createFrontEndCell(i, j);

            game.createBackEndCell(i, j, cell);
        }
    }
}

// Sets up the frontend of each cell
function createFrontEndCell(row, col) {
    // Grab cell from grid
    var gridContainer = document.getElementById("grid-container");

    // Set up attributes
    var cell = document.createElement("div");
    cell.className = "cell";
    cell.id = `i${row}_${col}`;
    cell.addEventListener("click", selectCell);
    gridContainer.appendChild(cell);
    return cell;
}

// Set up the game and appropriate buttons for controls
game.config(STAGE_ONE, null)
createGrid(GRID_LENGTH, GRID_LENGTH);
document.getElementById("next-player").addEventListener("click", nextPlayer);
document.getElementById("next-generation").addEventListener("click", nextGeneration);

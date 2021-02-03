import { selectCell, nextPlayer, nextGeneration, createBackEndCell, GRID_LENGTH } from "./setup.js";

function createGrid(rows, cols) {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            var cell = createFrontEndCell(i, j);

            createBackEndCell(i, j, cell);
        }
    }
}

function createFrontEndCell(row, col) {
    // Frontend cell
    var gridContainer = document.getElementById("grid-container");
    var cell = document.createElement("div");
    cell.className = "cell";
    cell.id = `i${row}_${col}`;
    cell.addEventListener("click", selectCell);
    gridContainer.appendChild(cell);
    return cell;
}

createGrid(GRID_LENGTH, GRID_LENGTH);
document.getElementById("next-player").addEventListener("click", nextPlayer);
document.getElementById("next-generation").addEventListener("click", nextGeneration);

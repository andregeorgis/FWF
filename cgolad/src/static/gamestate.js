import { playerColours, grid_length, grid} from "./setup.js";
import { Cell } from "./cell.js";

var player = 0;
// A grid of arrays of length 2 for number of neighbours for each player
export var neighbourGrid = Array.apply(null, Array(10)).map(x => Array.apply(null, Array(10)).map(y => [0, 0]))

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

export function updateNeighbour(row, col, index, change) {
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
    //export player;
}

createGrid(grid_length, grid_length);
document.getElementById("next-player").addEventListener("click", nextPlayer);
document.getElementById("next-player").style.backgroundColor = `${playerColours[player]}`;

export var playerColours = ["#E71D36", "#2EC4B6"];

// Backend grid
var grid_length = 10;
export var grid = new Grid(grid_length);

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


createGrid(grid_length, grid_length);
document.getElementById("next-player").addEventListener("click", nextPlayer);
document.getElementById("next-generation").addEventListener("click", nextGeneration);
document.getElementById("next-player").style.backgroundColor = `${playerColours[player]}`;

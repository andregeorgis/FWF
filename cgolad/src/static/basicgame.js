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
        updateCell(bindedCell);
}

function updateCell(cell) {
    var coords = cell.getCoord()
    updateNeighbour(coords[0], coords[1], cell.isBlank() ? 1 : -1)
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
    //console.log(cellStyle.backgroundColor);
    //console.log(cell.getPlayer());
}

function updateNeighbour(row, col, change) {
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
            var currId = `${i},${j}`;
            var currCell = grid.getCell(currId)

            // Get number of active neighbours
            var playerOneNum = neighbourGridCopy[i][j][0];
            var playerTwoNum = neighbourGridCopy[i][j][1];
            var totalNum = playerOneNum + playerTwoNum;

            if (currCell.isBlank()) {
                if (totalNum != 3)
                    continue

                updateNeighbour(i, j, currCell.isBlank() ? 1 : -1)
                var temp = playerOneNum > playerTwoNum ? 0 : 1
                currCell.activate(temp);
                currCell.element.style.backgroundColor = `${playerColours[temp]}`;
            }
            else {
                switch (totalNum) {
                    case 2:
                    case 3:
                        break;
                    default:
                        updateNeighbour(i, j, currCell.isBlank() ? 1 : -1);
                        currCell.deactivate();
                        currCell.element.style.backgroundColor = "transparent";
                        break;
                }
            }
        }
    }
}

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
document.getElementById("next-generation").addEventListener("click", nextGeneration)
document.getElementById("next-player").style.backgroundColor = `${playerColours[player]}`

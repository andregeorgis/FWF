import { Grid } from "./grid.js";
import { Cell } from "./cell.js";

export var playerColours = ["#E71D36", "#2EC4B6"];

// Backend grid
export var player = 0;
export var grid_length = 10;
var grid = new Grid(grid_length);


// A grid of arrays of length 2 for number of neighbours for each player
var neighbourGrid = Array.apply(null, Array(10)).map(x => Array.apply(null, Array(10)).map(y => [0, 0]))


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
    //export player;
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

export function createBackEndCell(row, col, cell) {
    grid.addCell(row, col, new Cell(cell));
}


export { selectCell, nextPlayer, nextGeneration }

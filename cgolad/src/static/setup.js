export { game, selectCell, nextPlayer, nextGeneration, createBackEndCell };

import { Grid } from "./grid.js";
import { Cell } from "./cell.js";
import { GameState } from "./gamestate.js";
import { PLAYER_ONE, PLAYER_TWO } from "./constants.js"

// Backend grid
var grid = new Grid();

// Game object
var game = new GameState();

// A grid of arrays of length 2 for number of neighbours for each player
var neighbourGrid = Array.apply(null, Array(10)).map(x => Array.apply(null, Array(10)).map(y => [0, 0]))


function createBackEndCell(row, col, cell) {
    grid.addCell(row, col, new Cell(cell));
}

function selectCell(event) {
    var clickedCell = event.target;
    var bindedCell = grid.getCell(clickedCell.id);

    // Update current cell
    if (bindedCell.isBlank() || bindedCell.getPlayer() == game.getPlayer())
        updateCell(bindedCell);
}

function updateCell(cell) {
    var coords = cell.getCoord()
    updateNeighbour(coords[0], coords[1], game.getPlayer(), cell.isBlank() ? 1 : -1)
    // console.log(neighbourGrid)

    var cellStyle = cell.element.style;

    if (cell.isBlank()) {
        cell.activate(game.getPlayer());
        cellStyle.backgroundColor = `${game.getPlayerColour()}`;
    }
    else {
        cell.deactivate();
        cellStyle.backgroundColor = "transparent";
    }

    // Update the GameState
    game.updateGame()
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
    game.changePlayer();
    var button = document.getElementById("next-player");
    button.style.backgroundColor = `${game.getPlayerColour()}`;
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

                var temp = playerOneNum > playerTwoNum ? PLAYER_ONE : PLAYER_TWO
                updateNeighbour(i, j, temp, currCell.isBlank() ? 1 : -1)
                currCell.activate(temp);
                currCell.element.style.backgroundColor = `${game.getPlayerColour()}`;
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

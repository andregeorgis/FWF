export { game, selectCell, nextPlayer, nextGeneration };

import { GameState } from "./gamestate.js";

// Game object
var game = new GameState();

function selectCell(event) {
    var clickedCell = event.target;
    var bindedCell = game.grid.getCell(clickedCell.id);

    // Update current cell
    game.clickCell(bindedCell);
}

function nextPlayer() {
    game.changePlayer();
    var button = document.getElementById("next-player");
    button.style.backgroundColor = `${game.getPlayerColour()}`;
}

function nextGeneration() {
    game.nextGenerationGrid();
}

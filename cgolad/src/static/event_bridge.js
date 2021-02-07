export { game, selectCell, nextPlayer, nextGeneration };

import { GameState } from "./gamestate.js";

// Game object
var game = new GameState();

// Wrapper event listener to handle listening for cell clicks
function selectCell(event) {
    var clickedCell = event.target;
    var bindedCell = game.grid.getCell(clickedCell.id);

    // Update current cell
    game.clickCell(bindedCell);
}

// Wrapper event listener to handle changing players
function nextPlayer() {
    game.changePlayer();
    var button = document.getElementById("next-player");
    button.style.backgroundColor = `${game.getPlayerColour()}`;
}

// Wrapper event listener to handle calculating the next generation
function nextGeneration() {
    game.nextGenerationGrid();
}

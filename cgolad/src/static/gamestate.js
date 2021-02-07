import { GRID_LENGTH, PLAYER_ONE, PLAYER_TWO, PLAYER_COLOURS, STAGE_ONE, STAGE_TWO, MOVE_CAP, GENERATION_CAP } from "./constants.js"
import { PLAYER_ONE_FIRST, PLAYER_TWO_FIRST, PLAYER_ONE_SECOND, PLAYER_TWO_SECOND, PLAYER_ONE_THIRD, PLAYER_TWO_THIRD, WAIT_STATE, NEXT_STATE, STATE_MESSAGE } from "./constants.js"
import { NO_WINNER, PLAYER_ONE_WINS, PLAYER_TWO_WINS, DRAW, END_MESSAGE } from "./constants.js"
import { GENERATION_PERIOD, RESET_PERIOD } from "./constants.js"
import { Grid } from "./grid.js"
import { Cell } from "./cell.js"

export class GameState {
    /*
     * Configuration Functions
     */
    constructor() {
        // Attributes associating with the current player
        this.player = PLAYER_ONE;
        this.colours = PLAYER_COLOURS;

        // Attrbiutes associating with the game "stage/mode"
        this.stage = -1;

        // Attributes associating with the game "state/phase"
        this.numOfMoves = 0;
        this.state = PLAYER_ONE_FIRST;
        this.canClick = true;
        this.indicator = null;

        // Attributes associating with the grid
        this.grid = new Grid();
        this.numActiveCells = [0, 0];
        this.neighbourGrid = Array.apply(null, Array(10)).map(x => Array.apply(null, Array(10)).map(y => [0, 0]));
        this.oldNeighbours = this.neighbourGrid.map(x => x.map(y => [...y]));

        // Attributes associating with handling asynchronous timeouts
        this.generationTimeouts = Array.apply(null, Array);
        this.waitStageTimeout = null;
    }

    // Configurate the mode/stage of the game and the visual indicator
    config(stageNum, indicator) {
        this.stage = stageNum;
        this.indicator = indicator;
        if (this.indicator != null)
            this.indicator.innerHTML = STATE_MESSAGE[this.state];
    }

    createBackEndCell(row, col, cell) {
        this.grid.addCell(row, col, new Cell(cell));
    }





    /*
     * Player Functions
     */
    getPlayer() {
        return this.player;
    }

    changePlayer() {
        this.player = this.player == PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
    }

    getPlayerColour() {
        return this.colours[this.player];
    }

    getSpecificColour(player) {
        return this.colours[player];
    }






    /*
     * Cell and Grid State Functions
     */
    // Event listener for handling when a cell is clicked on the screen
    clickCell(cell) {
        // Exit if cell cannot be clicked
        if (!this.canClick || (!cell.isBlank() && cell.getPlayer() != this.getPlayer()))
            return;

        // Update the neighbour grid
        var coords = cell.getCoord()
        this.updateNeighbour(coords[0], coords[1], this.getPlayer(), cell.isBlank() ? 1 : -1)

        // Either "click" or "unclick" the cell
        switch (cell.isBlank()) {
            case true:
                cell.activate(this.getPlayer(), this.getPlayerColour());
                this.numActiveCells[this.getPlayer()]++;
                break;
            case false:
                cell.deactivate();
                this.numActiveCells[this.getPlayer()]--;
                break;
        }

        // Update the game
        this.addMove();
    }

    // Updates the neighbour count of each cell
    updateNeighbour(row, col, index, change) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i == 0 && j == 0) || !this.grid.isValidCoord(row + i, col + j))
                    continue

                this.neighbourGrid[row + i][col + j][index] += change;
            }
        }
    }

    // Calculates the next grid configuration after applying game rules
    nextGenerationGrid() {
        // Copy the neighbour grid
        this.oldNeighbours = this.neighbourGrid.map(x => x.map(y => [...y]));

        // Calculates the status of all cells in the next generation
        for (let i = 0; i < GRID_LENGTH; i++) {
            for (let j = 0; j < GRID_LENGTH; j++) {
                this.nextGenerationCell(i, j);
            }
        }

        // Exit for stages/modes that don't need extra checks
        if (this.stageNum == STAGE_ONE)
            return;

        // Check if the game has ended
        var playerOneDead = this.numActiveCells[PLAYER_ONE] == 0 ? 2 : 0;
        var playerTwoDead = this.numActiveCells[PLAYER_TWO] == 0 ? 1 : 0;
        var return_val = playerOneDead + playerTwoDead;

        // If there is a win or a draw, reset the game
        if (playerOneDead || playerTwoDead)
            this.resetGame(return_val);
    }

    // Calculates the status of a cell in the next generation
    nextGenerationCell(row, col) {
        // Get cell
        var currId = `i${row}_${col}`;
        var cell = this.grid.getCell(currId)

        // Get number of active neighbours
        var playerOneNum = this.oldNeighbours[row][col][0];
        var playerTwoNum = this.oldNeighbours[row][col][1];
        var totalNum = playerOneNum + playerTwoNum;
        // Check which player had the most active neighbours
        var winner = playerOneNum > playerTwoNum ? PLAYER_ONE : PLAYER_TWO;

        // Apply game rules to determine status of cell
        switch(cell.isBlank()) {
            case true:
                switch (totalNum) {
                    case 3:
                        this.updateNeighbour(row, col, winner, cell.isBlank() ? 1 : -1)
                        cell.activate(winner, this.getSpecificColour(winner));
                        this.numActiveCells[winner]++;
                        break;
                }
                break;
            case false:
                switch (totalNum) {
                    case 2:
                    case 3:
                        break;
                    default:
                        this.updateNeighbour(row, col, cell.getPlayer(), cell.isBlank() ? 1 : -1);
                        this.numActiveCells[cell.getPlayer()]--;
                        cell.deactivate();
                        break;
                }
                break;
        }
    }





    /*
     * Game State Functions
     */
    banClicking() {
        this.canClick = false;
    }

    allowClicking() {
        this.canClick = true;
        this.waitStageTimeout = null;
    }

    addMove() {
        this.numOfMoves++;
        this.updateGame();
    }

    // After each move we check if we need to update the game
    updateGame() {
        switch (this.stage) {
            case STAGE_ONE:
                this.stageOneUpdate();
                break
            case STAGE_TWO:
            default:
                this.stageTwoUpdate();
                break;
        }
    }

    stageOneUpdate() {
        console.log("noice");
    }

    stageTwoUpdate() {
        // Exit if we do not need to update
        if (this.numOfMoves != MOVE_CAP[this.state])
            return;

        // Change player and update the state of the game
        this.changePlayer();
        this.numOfMoves = 0;
        this.updateState();

        // If we have entered the WAIT_STATE, calculate the next few generations
        if (this.state == WAIT_STATE) {
            // Clicking not allowed while generations are calculated
            this.banClicking();
            for (let i = 0; i < GENERATION_CAP; i++) {
                this.generationTimeouts[i] = setTimeout(this.nextGenerationGrid.bind(this), GENERATION_PERIOD * (i + 1));
            }

            // Allow clicking once the wait stage is finished
            this.waitStageTimeout = setTimeout(this.finishWaitStage.bind(this), GENERATION_PERIOD * GENERATION_CAP);
        }
    }

    finishWaitStage() {
        this.allowClicking();
        this.updateState();
    }

    // Go to the next state and update indicator if appropriate
    updateState() {
        this.state = NEXT_STATE[this.state];
        if (this.indicator != null)
            this.indicator.innerHTML = STATE_MESSAGE[this.state];
    }






    /*
     * Handling ending a game
     */
    // Ends the game if there is a win or draw
    resetGame(end_state) {
        // Update indicator if appropriate
        if (this.indicator != null)
            this.indicator.innerHTML = END_MESSAGE[end_state];

        // Clear all other timeouts
        this.stopTimeouts();

        // Set own timeout to clear the game
        setTimeout(this.clearGrid.bind(this), RESET_PERIOD);
        this.waitStageTimeout = setTimeout(this.finishWaitStage.bind(this), RESET_PERIOD);
    }

    // Clears all timeouts not responsible for ending the game
    stopTimeouts() {
        // Clear any generation timeouts
        for (let i = 0; i < GENERATION_CAP; i++) {
            if (this.generationTimeouts[i] != null)
                clearTimeout(this.generationTimeouts[i]);

            this.generationTimeouts[i] = null;
        }

        // Clear the wait stage timeout
        if (this.waitStageTimeout != null) {
            clearTimeout(this.waitStageTimeout)
            this.waitStageTimeout = null;
        }
    }

    // Clears the grid to reset the game
    clearGrid() {
        // Empty the neighbour grid
        this.neighbourGrid = this.neighbourGrid.map(x => x.map(y => [0, 0]));

        // "unclick" all cells
        for (let i = 0; i < GRID_LENGTH; i++) {
            for (let j = 0; j < GRID_LENGTH; j++) {
                var currId = `i${i}_${j}`;
                var cell = this.grid.getCell(currId);
                cell.deactivate();
            }
        }

        // Empty the active cells
        this.numActiveCells = [0, 0];
    }
}

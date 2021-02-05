import { GRID_LENGTH, PLAYER_ONE, PLAYER_TWO, PLAYER_COLOURS, STAGE_ONE, STAGE_TWO, MOVE_CAP, GENERATION_CAP } from "./constants.js"
import { Grid } from "./grid.js"
import { Cell } from "./cell.js"

export class GameState {
    /*
     * Configuration Functions
     */
    constructor() {
        this.player = PLAYER_ONE;
        this.colours = PLAYER_COLOURS;
        this.numOfMoves = 0;
        this.stage = -1;
        this.grid = new Grid();
        this.neighbourGrid = Array.apply(null, Array(10)).map(x => Array.apply(null, Array(10)).map(y => [0, 0]));
        this.oldNeighbours = this.neighbourGrid.map(x => x.map(y => [...y]));
    }

    // First part of handling "different stages" => equiv to "different modes"
    config(stageNum) {
        this.stage = stageNum;
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
    clickCell(cell) {
        // We can now make the conditions stage specific here
        if (!cell.isBlank() && cell.getPlayer() != this.getPlayer())
            return;

        var coords = cell.getCoord()
        this.updateNeighbour(coords[0], coords[1], this.getPlayer(), cell.isBlank() ? 1 : -1)

        switch (cell.isBlank()) {
            case true:
                cell.activate(this.getPlayer(), this.getPlayerColour());
                break;
            case false:
                cell.deactivate();
                break;
        }

        // Update the game
        this.addMove();
    }

    updateNeighbour(row, col, index, change) {
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if ((i == 0 && j == 0) || !this.grid.isValidCoord(row + i, col + j))
                    continue

                this.neighbourGrid[row + i][col + j][index] += change;
            }
        }
    }

    nextGenerationGrid() {
        // Copy the neighbour grid
        this.oldNeighbours = this.neighbourGrid.map(x => x.map(y => [...y]));

        for (let i = 0; i < GRID_LENGTH; i++) {
            for (let j = 0; j < GRID_LENGTH; j++) {
                this.nextGenerationCell(i, j);
            }
        }
    }

    nextGenerationCell(row, col) {
        // Get cell
        var currId = `i${row}_${col}`;
        var cell = this.grid.getCell(currId)

        // Get number of active neighbours
        var playerOneNum = this.oldNeighbours[row][col][0];
        var playerTwoNum = this.oldNeighbours[row][col][1];
        var totalNum = playerOneNum + playerTwoNum;
        var winner = playerOneNum > playerTwoNum ? PLAYER_ONE : PLAYER_TWO;

        switch(cell.isBlank()) {
            case true:
                switch (totalNum) {
                    case 3:
                        this.updateNeighbour(row, col, winner, cell.isBlank() ? 1 : -1)
                        cell.activate(winner, this.getSpecificColour(winner));
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
                        cell.deactivate();
                        break;
                }
                break;
        }
    }

    /*
     * Game State Functions
     */
    // Later we can add "history" functionality
    addMove() {
        this.numOfMoves++;
        this.updateGame();
    }

    // Second part of handling "different stages" => equiv to "different modes"
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
        if (this.numOfMoves != MOVE_CAP)
            return;

        if (this.getPlayer() == PLAYER_TWO) {
            for (let i = 0; i < GENERATION_CAP; i++) {
                setTimeout(this.nextGenerationGrid.bind(this), 2000 * (i + 1));
            }
        }

        this.changePlayer();
        this.numOfMoves = 0;
    }
}

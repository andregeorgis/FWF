import { PLAYER_ONE, PLAYER_TWO, COLOURS, STAGE_ONE, STAGE_TWO } from "./constants.js"

export class GameState {
    constructor() {
        this.player = PLAYER_ONE;
        this.colours = COLOURS;
        this.numOfMoves = 0;
        this.stage = -1;
    }

    // First part of handling "different stages" => equiv to "different modes"
    config(stageNum) {
        this.stage = stageNum;
    }

    getPlayer() {
        return this.player;
    }

    changePlayer() {
        this.player = this.player == PLAYER_ONE ? PLAYER_TWO : PLAYER_ONE;
    }

    getPlayerColour() {
        return this.colours[this.player];
    }

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
                break;
        }
    }

    stageOneUpdate() {
        console.log("noice");
    }
}

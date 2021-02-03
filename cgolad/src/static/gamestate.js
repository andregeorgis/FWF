export { PLAYER_ONE, PLAYER_TWO, STAGE_ONE, STAGE_TWO, GameState };

var PLAYER_ONE = 0;
var PLAYER_TWO = 1;
var COLOURS = ["#E71D36", "#2EC4B6"];
var STAGE_ONE = 1;
var STAGE_TWO = 2;

class GameState {
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
        this.player = this.player ? 0 : 1;
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

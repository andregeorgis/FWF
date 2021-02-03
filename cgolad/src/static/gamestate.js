export { PLAYER_ONE, PLAYER_TWO, GameState };

var PLAYER_ONE = 0;
var PLAYER_TWO = 1;

class GameState {
    constructor() {
        this.player = 0;
        this.colours = ["#E71D36", "#2EC4B6"];
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
}

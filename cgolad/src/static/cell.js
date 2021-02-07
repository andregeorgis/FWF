import { BLANK_COLOUR } from "./constants.js"

export class Cell {
    constructor(element) {
        this.player = -1;
        this.active = false;
        this.element = element;
        this.style = element.style;
    }

    setPlayer(newPlayer) {
        this.player = newPlayer;
    }

    // Cell becomes "clicked" on the screen
    activate(player, colour) {
        this.active = true;
        this.style.backgroundColor = `${colour}`;
        this.player = player;
    }

    // Cell becomes "unclicked" on the screen
    deactivate() {
        this.active = false;
        this.style.backgroundColor = BLANK_COLOUR;
        this.player = -1;
    }

    getStatus() {
        return this.active;
    }

    getPlayer() {
        return this.player;
    }

    isBlank() {
        return !this.active;
    }

    // Return grid position
    getCoord() {
        var sep = this.element.id.indexOf("_");
        var row = parseInt(this.element.id.slice(1,sep));
        var col = parseInt(this.element.id.slice(sep+1));
        return [row, col]
    }
}

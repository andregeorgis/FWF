export class Cell {

    constructor(element) {
        this.player = -1;
        this.active = false;
        //this.id = element.id;
        this.element = element;
    }

    setPlayer(newPlayer) {
        this.player = newPlayer;
    }

    activate(player) {
        this.active = true;
        this.player = player;
    }

    deactivate() {
        this.active = false;
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

    getCoord() {
        var comma = element.id.indexOf(",");
        var row = parseInt(id.slice(0,comma));
        var col = parseInt(id.slice(comma+1));
        return [row, col]
    }
}

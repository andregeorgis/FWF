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
        var sep = this.element.id.indexOf("_");
        var row = parseInt(this.element.id.slice(1,sep));
        var col = parseInt(this.element.id.slice(sep+1));
        return [row, col]
    }
}

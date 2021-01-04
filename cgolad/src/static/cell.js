export class Cell {

    constructor(element) {
        this.player = -1;
        this.active = this.activeOff();
        //this.id = element.id;
        this.element = element;
    }

    setPlayer(newPlayer) {
        this.player = newPlayer;
    }

    activeOn() {
        this.active = true;
    }

    activeOff() {
        this.active = false;
    }

    getStatus() {
        return this.active;
    }

    getPlayer() {
        return this.player;
    }
}

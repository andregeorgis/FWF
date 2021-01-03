export class Cell {
    player = -1;

    constructor(element) {
        this.active = this.activeOff();
        this.id = element.id;
        //console.log(this.id);
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

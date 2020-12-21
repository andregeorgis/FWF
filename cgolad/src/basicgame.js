var cells = [];
var player = 0;

class Cell {
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


document.getElementById("next-player").addEventListener("click", function(){player=(player+1)%2;})

function createGrid(rows, cols) {
    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            createCell(i, j);
        }
    }
}

function createCell(row, col) {
    var gridContainer = document.getElementById("grid-container");
    var cell = document.createElement("div");
    cell.className = "cell";
    cell.id = `${row},${col}`;
    cell.addEventListener("click", selectCell);
    gridContainer.appendChild(cell);
    cells.push(new Cell(cell));
}

function selectCell(event) {
    var clickedCell = event.target;
    var bindedCell = getCellByID(clickedCell.id);
    bindedCell.setPlayer(player);
    if (player == 0) {
        changeColour(clickedCell, bindedCell, "red");
    }
    else if (player == 1) {
        changeColour(clickedCell, bindedCell, "blue");
    }
    console.log(bindedCell);
}

function changeColour(viewCell, bindCell, colour) {
    if (viewCell.style.backgroundColor != `${colour}`) {
        bindCell.activeOn();
        viewCell.style.backgroundColor = `${colour}`;
    }
    else {
        bindCell.activeOff();
        viewCell.style.backgroundColor = "transparent";
    }
}

function getCellByID(id) {
    for (cell of cells) {
            if (cell.id == id) {
                return cell;
            }
    }
}


createGrid(4, 4);

for (cell of cells) {
    //console.log(cell.id);
}

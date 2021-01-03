import { Cell } from "./cell.js";


var cells = [];
var player = 0;


document.getElementById("next-player").addEventListener("click", function(){player=(player+1)%2;})

function createGrid(rows, cols) {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
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
    var bindedCell = getCell(clickedCell.id);
    bindedCell.setPlayer(player);
    if (player == 0) {
        changeColour(clickedCell, bindedCell, "red");
    }
    else if (player == 1) {
        changeColour(clickedCell, bindedCell, "blue");
    }
    //console.log(clickedCell.id);
    console.log(bindedCell.element.id);
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

function getCell(id) {

    /*for (cell of cells) {
        if (cell.id == id) {
            return cell;
        }
    }*/

    var idx = id.indexOf(",");
    var cellIdx = (parseInt(id.slice(0, idx)) * 10) + (parseInt(id.slice(idx + 1)));
    return cells[cellIdx];
}


createGrid(10, 10);

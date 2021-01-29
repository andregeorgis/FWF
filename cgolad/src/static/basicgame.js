import { Cell } from "./cell.js";
import { Grid } from "./grid.js";


var grid = new Grid();
var player = 0;

createGrid(5, 5);

document.getElementById("next-player").addEventListener("click", function(){player=(player+1)%2;});
document.getElementById("next-gen").addEventListener("click", runGame);

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
    var newCell = new Cell(cell);
    grid.addCell(row, col, newCell);
}

function selectCell(event) {
    var clickedCell = event.target;
    var bindedCell = grid.getCell(clickedCell.id);
    if (player == 0 && bindedCell.getPlayer() != 1) {
        changeColour(bindedCell, "red");
    }
    else if (player == 1 && bindedCell.getPlayer() != 0) {
        changeColour(bindedCell, "blue");
    }
}

function changeColour(cell, colour) {
    var cellStyle = cell.element.style;
    if (cellStyle.backgroundColor != `${colour}`) {
        cell.activeOn();
        cell.setPlayer(player);
        cellStyle.backgroundColor = `${colour}`;
    }
    else {
        cell.activeOff();
        cell.setPlayer(-1);
        cellStyle.backgroundColor = "transparent";
    }
}

function runGame() {
    var turns = 0;
    var p1Counter = 0;
    var p2Counter = 0;
    var total = 0;

    while (turns >= 0) {
        // Constructing a temporary grid to store new generation

        //var tempGrid = new Array(5);
        //for (var i = 0; i < 5; i++) {
        //    tempGrid[i] = new Array(5);
        //}

        var tempGrid = grid.grid.slice();
        console.log(tempGrid);




        for (var row = 0; row < 5; row++) {
            for (var col = 0; col < 5; col++) {

                for (var i = -1; i < 2; i++) {
                    for (var j = -1; j < 2; j++) {
                        if (row + i < 0 || row + i >= 5) {continue;}
                        if (col + j < 0 || col + j >= 5) {continue;}

                        if ( i != 0 || j != 0 ) {
                            //console.log(row+i,col+j);
                            var cell = grid.getCell( (row + i).toString() + "," + (col + j).toString() );
                            if (cell.element.style.backgroundColor == "red") {p1Counter++;}
                            else if (cell.element.style.backgroundColor == "blue") {p2Counter++;}
                        }
                    }
                }
                total = p1Counter + p2Counter;
                console.log(total);
                if ( cell.getStatus() == true && (total <= 1 || total >= 4) ) {
                    changeColour(tempGrid[row][col], "transparent")
                }
                else if ( cell.getStatus() == false && total == 3 ) {
                    if (p1Counter > p2Counter) {changeColour(cell, "red");}
                    else {changeColour(tempGrid[row][col], "blue");}
                }
                total = 0;
                p1Counter = 0;
                p2Counter = 0;
            }
        }



        turns--;
    }
}

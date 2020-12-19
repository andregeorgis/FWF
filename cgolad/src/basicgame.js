

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
}

function selectCell(event) {
    var clickedCell = event.target;
    if (clickedCell.style.backgroundColor != "red") {
        clickedCell.style.backgroundColor = "red";
    }
    else {
        clickedCell.style.backgroundColor = "transparent";
    }

}




createGrid(10, 10);

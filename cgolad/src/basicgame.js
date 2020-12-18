const gridContainer = document.getElementById("grid-container");

function createGrid(rows, cols) {

    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            let cell = document.createElement("div");
            let appendedCell = gridContainer.appendChild(cell);
            appendedCell.className = "cell";
            appendedCell.id = `${i},${j}`;
            appendedCell.addEventListener("click", selectCell);
        }
    }
}

function selectCell(event) {
    var clickedCell = event.target;
    console.log(clickedCell);
    clickedCell.style.backgroundColor = "red";

}

createGrid(10, 10);

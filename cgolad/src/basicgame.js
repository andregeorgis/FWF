const gridContainer = document.getElementById("grid-container");

function createGrid(rows, cols) {

    for (i = 0; i < rows*cols; i++) {
        let cell = document.createElement("div");
        gridContainer.appendChild(cell).className = "cell";
    }
}

createGrid(10, 10);

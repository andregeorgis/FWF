import { playerColours, grid} from "./setup.js";
import { neighbourGrid, updateNeighbour } from "./gamestate.js";

function nextGeneration() {
    // Make a copy of the neighbour grid
    var neighbourGridCopy = neighbourGrid.map(x => x.map(y => [...y]))

    for (let i = 0; i < grid.getLength(); i++) {
        for (let j = 0; j < grid.getLength(); j++) {
            // Get cell
            var currId = `i${i}_${j}`;
            var currCell = grid.getCell(currId)

            // Get number of active neighbours
            var playerOneNum = neighbourGridCopy[i][j][0];
            var playerTwoNum = neighbourGridCopy[i][j][1];
            var totalNum = playerOneNum + playerTwoNum;

            if (currCell.isBlank()) {
                if (totalNum != 3)
                    continue

                var temp = playerOneNum > playerTwoNum ? 0 : 1
                updateNeighbour(i, j, temp, currCell.isBlank() ? 1 : -1)
                currCell.activate(temp);
                currCell.element.style.backgroundColor = `${playerColours[temp]}`;
            }
            else {
                switch (totalNum) {
                    case 2:
                    case 3:
                        break;
                    default:
                        updateNeighbour(i, j, currCell.getPlayer(), currCell.isBlank() ? 1 : -1);
                        currCell.deactivate();
                        currCell.element.style.backgroundColor = "transparent";
                        break;
                }
            }
        }
    }
}

document.getElementById("next-generation").addEventListener("click", nextGeneration);

import { GRID_LENGTH } from "./constants.js"

export class Grid {

    constructor() {
        /* Implement the constructor to create a 2d square grid.
        *  Ensure the length on this grid matches,
        *  e.g. if the grid on the html is 10x10
        *       the grid here should be 10x10 too.
        */
        this.length = GRID_LENGTH;
        this.grid = new Array(GRID_LENGTH);
        for (var i = 0; i < GRID_LENGTH; i++) {
            this.grid[i] = new Array(length);
        }
    }

    /* Create a function to access an element of the grid, given a string.
    *  e.g. if the supplied string is "1,3", you should access the element
    *       this.grid[1][3].
    *  You do not need to do any error checking on the string.
    *
    *  Note that we use a string since the ids of each of the html cells are the
    *  string "i${row}_${cell}"
    *
    *  The initial 'i' and the '_' is to make sure it is a valid html id
    */

    // darius smells - I agree //

    getCell(id) {
        var sep = id.indexOf("_");
        var row = parseInt(id.slice(1,sep));
        var col = parseInt(id.slice(sep+1));
        return this.grid[row][col];
    }

    addCell(row, col, cell) {
        this.grid[row][col] = cell;
    }

    getLength() {
        return this.length;
    }

    // Checks that a provided coord is within the grid dimensions
    isValidCoord(row, col) {
        return row >= 0 && row < this.length && col >= 0 && col < this.length;
    }
}

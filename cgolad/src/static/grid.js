export class Grid {

    constructor(width, height, x, y, inside) {
        /* Implement the constructor to create a 2d square grid.
        *  Ensure the length on this grid matches,
        *  e.g. if the grid on the html is 10x10
        *       the grid here should be 10x10 too.
        */

        this.grid = new Array(10);
        for (var i = 0; i < 10; i++) {
            this.grid[i] = new Array(10);
        }
    }

    /* Create a function to access an element of the grid, given a string.
    *  e.g. if the supplied string is "1,3", you should access the element
    *       this.grid[1][3].
    *  You do not need to do any error checking on the string.
    */

    // darius smells //

    getCell(id) {
        var comma = id.indexOf(",");
        var row = parseInt(id.slice(0,comma));
        var col = parseInt(id.slice(comma+1));
        return this.grid[row][col];
    }

    addCell(row, col, cell) {
        this.grid[row][col] = cell;
    }
}

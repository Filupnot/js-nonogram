// Script to solve any puzzle on https://www.puzzle-nonograms.com
// Created by Philip Knott
// Finished in July 2020 (during quarantine, because what else is there to do??)

class Solver {
    /**
     * Constructor
     * @param {Object} Game
     */
    constructor(Game) {
        this.size = Game.task.rows.length;
        this.field = [];

        for (let i = 0; i < this.size; i++) {
            let temp = [];
            for (let j = 0; j < this.size; j++) {
                temp.push(0);
            }
            this.field.push(temp);
        }

        this.rows = [];
        Game.task.rows.forEach(row => {
            this.rows.push({
                'header': row,
                'options': this.getOptions(row)
            })
        })

        this.columns = [];
        Game.task.columns.forEach(col => {
            this.columns.push({
                'header': col,
                'options': this.getOptions(col)
            })
        })
    }

    /**
     * Returns an array with all possible row/column combinations that satisfy the given headers.
     * @param {Array} header for row or column
     */
    getOptions(arr) {
        let options = [];

        // for when there's only one number in the header
        if (arr.length == 1) {
            let num = this.size - arr[0] + 1;

            for (let i = 0; i < num; i++) {
                let temp = new Array(this.size).fill(0);

                for (let j = 0; j < arr[0]; j++) {
                    temp[i + j] = 1;
                }
                options.push(temp);
            }
            return options;
        }

        // get starting indices (sum of previous numbers plus sum of spaces between)
        // ex: the base case [1, 0, 1, 1, 0, 1, 0, 1, 0, 0] would return the array [0, 2, 5, 7]
        let startingIndices = [];
        for (let i = arr.length - 1; i >= 0; i--) {
            let temp = 0;
            for (let j = 0; j < i; j++) {
                temp += Number(arr[j]); // sum of previous numbers
            }
            temp += i; // sum of spaces between numbers
            startingIndices.push(temp);
        }
        startingIndices.reverse();

        // get base (represents number of spaces each chunk can shift within a block)
        let sum = 0;
        arr.forEach(e => { sum += Number(e); });
        let base = this.size - sum - (arr.length - 1) + 1;

        // if there is only one option
        if (base == 1) {
            let only = [];

            arr.forEach(e => {
                for (let i = 0; i < e; i++) { only.push(1); }
                only.push(0);
            })
            only.pop(); // take out last .
            options.push(only);
            return options;
        }

        // get based numbers
        let dec = [];
        for (let i = 0; i < Math.pow(base, arr.length); i++) {
            let result = i.toString(base);

            // check that digit values are NEVER descending
            let good = true;
            for (let i = 1; i < result.length; i++) {
                // if (result.charAt(i) < result.charAt(i - 1)) {
                if (parseInt(result.charAt(i), base) < parseInt(result.charAt(i - 1), base)) {
                    good = false;
                    break;
                }
            }
            if (good) {

                // padding
                result = result.padStart(arr.length, '00000000000000000000');

                // convert to array of integers
                result = result.split('');
                for (let j = 0; j < result.length; j++) {
                    // result[j] = Number(result[j]);
                    result[j] = parseInt(result[j], base);
                }

                dec.push(result);
            }
        }

        // get options
        dec.forEach(d => {
            let temp = new Array(this.size).fill(0);

            for (let i = 0; i < arr.length; i++) {
                let startpos = startingIndices[i] + d[i];

                for (let j = 0; j < arr[i]; j++) {
                    temp[j + startpos] = 1;
                }
            }
            options.push(temp);
        })

        return options;
    }

    /**
     * Solves the game! 
     */
    solve() {

        // Returns true if the game is completed and all headers are satisfied
        let isComplete = () => {
            for (let i = 0; i < this.size; i++) {
                if (this.rows[i].options.length != 1 || this.columns[i].options.length != 1) {
                    return false;
                }
            }
            return true;
        }

        // keeps iterating through all rows and columns until game is solved
        do {

            // rows
            this.rows.forEach((row, ri, rows) => {

                // get rid of options that conflict with what's already on the field
                for (let i = 0; i < this.size; i++) {
                    if (this.field[ri][i] == 1 || this.field[ri][i] == 2) {
                        for (let oi = row.options.length - 1; oi >= 0; oi--) {
                            if (row.options[oi][i] == (this.field[ri][i] == 1 ? 0 : 1)) {
                                rows[ri].options.splice(oi, 1);
                                continue;
                            }
                        }
                    }
                }

                // implement values which all options share 
                for (let i = 0; i < this.size; i++) {
                    let fill = true, nofill = true;

                    row.options.forEach(o => {
                        o[i] == 0 ? fill = false : nofill = false;
                    })

                    this.field[ri][i] = fill ? 1 : nofill ? 2 : 0;
                }
            })

            // columns
            this.columns.forEach((col, ci, columns) => {

                // get rid of options that conflict with what's already on the field
                for (let i = 0; i < this.size; i++) {
                    if (this.field[i][ci] == 1 || this.field[i][ci] == 2) {
                        for (let oi = col.options.length - 1; oi >= 0; oi--) {
                            if (col.options[oi][i] == (this.field[i][ci] == 1 ? 0 : 1)) {
                                columns[ci].options.splice(oi, 1);
                                continue;
                            }
                        }
                    }
                }

                // implement values which all options share 
                for (let i = 0; i < this.size; i++) {
                    let fill = true, nofill = true;

                    col.options.forEach(o => {
                        o[i] == 0 ? fill = false : nofill = false;
                    })

                    this.field[i][ci] = fill ? 1 : nofill ? 2 : 0;
                }
            })

        } while (!isComplete());

        // Interacts with Game object and fills in field
        for (let row = 0; row < this.size; row++) {
            for (let col = 0; col < this.size; col++) {
                Game.drawCellStatus({ row, col }, this.field[row][col] == 2 ? 0 : 1) // changes CSS of cell
                Game.setCellState({ row, col }, this.field[row][col]) // changes cell statue
            }
        }

        $('#robot').val(1); 
        $('#btnReady').click() // submits game
    }
}

new Solver(Game).solve()
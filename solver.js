const Game = require('./game2/game2.json');

class Solver {
    constructor(Game) {
        this.size = Game.task.rows.length;
        this.field = [];

        for (let i = 0; i < this.size; i++) {
            let temp = [];
            for (let j = 0; j < this.size; j++) {
                temp.push('.');
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

    getSize() {
        return this.size;
    }

    getField() {
        return this.field;
    }

    /**
     * Returns a string containing the field headers and contents
     * in a readable format.
     */
    toString() {
        let str = '\n';

        // print top header
        for (let c = 0; c < Game.maxColumnNumbers; c++) {
            for (let r = 0; r < Game.maxRowNumbers; r++) {
                str += '   ';
            }
            Game.task.columns.forEach(col => {
                if (col[c]) {
                    str += ' ' + col[c] + ' ';
                } else {
                    str += '   ';
                }
            })
            str += '\n';
        }

        // print side header & field
        for (let i = 0; i < this.size; i++) {

            // header
            for (let r = 0; r < Game.maxRowNumbers; r++) {
                if (Game.task.rows[i][r]) {
                    str += ' ' + Game.task.rows[i][r] + ' ';
                } else {
                    str += '   ';
                }
            }

            // field
            this.field[i].forEach(e => {
                str += ' ' + e + ' ';
            })
            str += '\n';
        }
        return (str);
    }

    /**
     * Returns an array with all possible row/column combinations that satisfy the given headers.
     * @param {*} array header for row or column
     */
    getOptions(arr) {

        let options = [];

        // for when there's only one number in the header
        if (arr.length == 1) {
            let num = this.size - arr[0] + 1;

            for (let i = 0; i < num; i++) {
                let temp = new Array(this.size).fill('.');

                for (let j = 0; j < arr[0]; j++) {
                    temp[i + j] = '0';
                }
                options.push(temp);
            }
            return options;
        }

        // get starting indices (sum of previous numbers plus sum of spaces between)
        // ex: the base case [ 0 . 0 0 . 0 . 0 . . ] would return the array [ 0 2 5 7 ]
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

        // get base
        let sum = 0;
        arr.forEach(e => { sum += Number(e); });
        let base = this.size - sum - (arr.length - 1) + 1;

        // get based numbers
        let dec = [];
        for (let i = 0; i < Math.pow(base, arr.length); i++) {
            let result = i.toString(base);

            if (arr.length == 1) {

                // convert to array of integers
                result = result.split('');
                for (let j = 0; j < result.length; j++) {
                    result[j] = Number(result[j]);
                }

                dec.push(result);
            } else {

                // check that digit values are NEVER descending
                let good = true;
                for (let i = 1; i < result.length; i++) {
                    if (result.charAt(i) < result.charAt(i - 1)) {
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
                        result[j] = Number(result[j]);
                    }

                    dec.push(result);
                }
            }
        }

        // get options
        dec.forEach(d => {
            let temp = new Array(this.size).fill('.');

            for (let i = 0; i < arr.length; i++) {
                let startpos = startingIndices[i] + d[i];

                for (let j = 0; j < arr[i]; j++) {
                    temp[j + startpos] = '0';
                }
            }
            options.push(temp);
        })
        return options;
    }

    /**
     * Solves the game (if possible without needing to guess at any point)
     */
    solve() {
    
    }
}

let mysolver = new Solver(Game);
mysolver.solve();
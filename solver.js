const fs = require('fs');

const Game = require('./game2/game2.json');

class Solver {
    constructor(size) {
        this.size = size;
        this.field = [];

        for (let i = 0; i < size; i++) {
            let temp = [];
            for (let j = 0; j < size; j++) {
                temp.push('.');
            }
            this.field.push(temp);
        }
    }

    getSize() {
        return this.size;
    }

    getField() {
        return this.field;
    }

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

        return(str);
    }

    solve() {

    }

    getOptions(arr) {
        let baseCase = '';
        arr.forEach(e => {
            for (let i=0; i<parseInt(e); i++) {
                baseCase += '0';
            }
            baseCase += '.';
        })

        // get rid of extra period
        baseCase = baseCase.substr(0, baseCase.length - 1);

        // add periods for extra spaces at end
        while (baseCase.length < size) {
            baseCase += '.';
        }    

        console.log(baseCase);
    }

    
}

let mysolver = new Solver(Game.task.rows.length);

console.log(mysolver.toString());

// mysolver.getOptions(Game.task.columns[2]);


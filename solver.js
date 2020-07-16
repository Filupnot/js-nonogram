const fs = require('fs');

const Game = require('./game.json');

let size = Game.task.columns.length;

class solver {
    constructor(size) {
        this.size = size;
        this.field = [];

        for (let i=0; i<size; i++) {
            let temp = [];
            for (let j=0; j<size; j++) {
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

    print() {
        let str = '';

        // print top header
        for (let c=0; c<Game.maxColumnNumbers; c++) {
            for (let r=0; r<Game.maxRowNumbers; r++) {
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
        for (let i=0; i<size; i++) {
           
            // header
            for (let r=0; r<Game.maxRowNumbers; r++) {
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

        // this.field.forEach(r => {
        //     r.forEach(n => {
        //         str += n + ' ';
        //     })
        //     str += '\n';
        // })

        console.log(str);
    }
}

let mysolver = new solver(5);

mysolver.print();


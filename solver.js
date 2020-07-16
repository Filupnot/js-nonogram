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

        this.field.forEach(r => {
            r.forEach(n => {
                str += n + ' ';
            })
            str += '\n';
        })

        console.log(str);
    }
}

let mysolver = new solver(5);

mysolver.print();
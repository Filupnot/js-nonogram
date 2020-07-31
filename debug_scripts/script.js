const Game = require('./game2/game2.json');

let str = '';

Game.task.rows.forEach(r => {
    r.forEach(h => {
        str += h + ' ';
    })
    str += '\n'
})

str += '-\n';

Game.task.columns.forEach(c => {
    c.forEach(h => {
        str += h + ' ';
    })
    str += '\n'
})

str
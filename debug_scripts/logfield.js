/**
 * Returns a string containing the field headers and contents
 * in a readable format. Unnecessary for script, but nice to have anyways
 */
getPrettyField() {
    let str = '\n';

    // print top header
    for (let c = 0; c < Game.maxColumnNumbers; c++) {
        for (let r = 0; r < Game.maxRowNumbers; r++) {
            str += '   ';
        }
        Game.task.columns.forEach(col => {
            if (col[c]) {
                str += col[c].padEnd(3, '   ');
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
                str += Game.task.rows[i][r].padEnd(3, '   ');
            } else {
                str += '   ';
            }
        }

        // field
        this.field[i].forEach(e => {
            str += (e == 1 ? 'O' : '.').padEnd(3, '   '); // hides X's for readability
            // str += e.toString().padEnd(3, '   '); // shows X's for debugging
        })
        str += '\n';
    }
    return (str);
}
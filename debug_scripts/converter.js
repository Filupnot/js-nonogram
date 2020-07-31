/* This script uses a text file with basic header info and creates
a json file in the format of the Game object. Used only for a specific case 
but keeping nevertheless. */

const fs = require('fs');

let task = {
    'rows': [],
    'columns': []
}

let game = {
    task,
    'maxColumnNumbers': 4,
    'maxRowNumbers': 4
}

fs.readFile('./game3/game3.txt', (err, data) => {


    if (err) { console.log(err); }

    let jd = data.toJSON();
    let temp = [];

    let c = 0;

    jd.data.forEach(e => {
        switch (e) {
            case 13:
                // task.rows.push(temp);
                if (temp.length > 0) {
                    if (c == 0) {
                        task.columns.push(temp);
                    } else {
                        task.rows.push(temp);
                    }
                }
                break;
            case 10:
                temp = [];
                break;
            case 32:
                break;
            case 45:
                c++;
                break;
            default:
                temp.push(String.fromCharCode(e));
        }
    })
    task.rows.push(temp);

    fs.writeFile('./game3/game3.json', JSON.stringify(game), () => {
        console.log('done!');
    })
})


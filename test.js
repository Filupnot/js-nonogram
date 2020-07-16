const fs = require('fs');

let task = {
    'rows': [],
    'columns': []
}

let game = {
    task, 
    'maxColumnNumbers': 3,
    'maxRowNumbers': 4
}

fs.readFile('./game2/game2.txt', (err, data) => {

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

    console.log(jd);

    console.log('rows:', task.rows);
    

    fs.writeFile('./game2/game2.json', JSON.stringify(game), () => {
        console.log('done!');
    })
})


let fs = require('fs');

fs.readFile('day4input', 'utf8', (err,contents) => {

    let rec_objs = [];
    let records = contents.trim().split("\n");
    records.forEach((r) => {
        let datetime = /\d{4}-\d{2}-\d{2} \d{2}:(\d{2})/g.exec(r);
        let minute = datetime[1];
        let date = datetime[0];
        let action = /\w+ \w+$|Guard #(\d+) begins shift$/g.exec(r)[0];

        rec_objs.push({
            dt : new Date(date),
            m : minute,
            a : action
        });
    });

    rec_objs = rec_objs.sort((a, b) => {
        return a.dt - b.dt;
    });

    
    let guardNum = null;
    let start = null;
    let end = null;
    let guards = {};
    rec_objs.forEach((rec) => {
        if (rec.a.charAt(0) == 'G') {
            guardNum = /\d+/.exec(rec.a)[0];
            if (guards[guardNum] == undefined) {
                guards[guardNum] = {};
            }
        } else if (rec.a.charAt(0) == 'f') {
            start = rec.m;
        } else if (rec.a.charAt(0) == 'w') {
            end = rec.m;
            for (let i = start; i < end; i++) {
                if (isNaN(guards[guardNum][i])) {
                    guards[guardNum][i] = 0;
                }
                guards[guardNum][i]++;
            }
            if (isNaN(guards[guardNum].total)) {
                guards[guardNum].total = 0;
            }
            guards[guardNum].total += end - start;
        }
    });

    let maxSleep = 0;
    let sleepyBoi = null;

    for (let g in guards) {
        if (guards[g].total > maxSleep) {
            maxSleep = guards[g].total;
            sleepyBoi = g;
        }
    }

    maxMin = 0;
    maxMinNum = null;
    for (let min in guards[sleepyBoi]) {
        if (min != 'total' && maxMin < guards[sleepyBoi][min]) {
            maxMin = guards[sleepyBoi][min];
            maxMinNum = min;
        }
    }
    console.log('Sleepiest boi is ' + sleepyBoi + ' who slept most at minute #' + maxMinNum);
    console.log('part one answer is ' + (sleepyBoi * maxMinNum));
});

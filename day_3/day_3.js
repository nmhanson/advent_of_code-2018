class Claim {
    constructor(id, x, y, w, h) {
        this.id = parseInt(id);
        this.x = parseInt(x);
        this.y = parseInt(y);
        this.w = parseInt(w);
        this.h = parseInt(h);
    }

    mark(fabric) {
        for (let i = this.x; i < this.x + this.w; i++) {
            for (let j = this.y; j < this.y + this.h; j++) {
                ++fabric[i][j];
            }
        }
    }

    collides(c) {
        if ( this.x < c.x + c.w &&
                this.x + this.w > c.x &&
                this.y < c.y + c.h &&
                this.y + this.h > c.y) return true;
    }
}


let f = []
for (let i = 0; i < 1000; i++) {
    f.push(new Array(1000).fill(0));
}
let claims = [];
let fs = require('fs');

fs.readFile('day3input', 'utf8', (err, contents) => {
    let str_claims = contents.trim().split("\n");
    str_claims.forEach((c) => {
        c = c.split(' ');
        let id = c[0].substring(1); // Remove the # character
        let coords = c[2].replace(/:$/,'').split(','); // remove the colon, split into x and y
        let dims = c[3].split('x'); // split on the x in WxH

        claims.push(new Claim(id, coords[0], coords[1], dims[0], dims[1]));
    });

    while (checked = claims.shift()) {
        let good = true;
        try {
            claims.forEach((c) => {
                if(checked.collides(c)) {
                    good = false;
                    throw Exception;
                }
            });
        } catch(e) {
            //noop
        }

        if(good) { console.log(checked); break; }
        claims.push(checked);
    }
});


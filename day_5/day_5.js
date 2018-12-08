let fs = require('fs');

function findReactable(polymer) {
    for (let i = 0; i < polymer.length - 1; i++) {
        let unit = polymer.charAt(i);
        let nextUnit = polymer.charAt(i + 1);

        if (unit.toLowerCase() === unit) { // unit is lowercase
            if (unit.toUpperCase() === nextUnit) {
                return i;
            }
        } else { // unit is uppercase
            if (unit.toLowerCase() === nextUnit) {
                return i;
            }
        }
    }

    return -1;
}

function removeReactable(polymer, rIndex) {
    return polymer.substring(0, rIndex) + polymer.substring(rIndex + 2);
}

function react(polymer) { // This causes SO because Node doesn't allow TCO anymore. Am sad.
    rIndex = findReactable(polymer);

    if (rIndex === -1) {
        return polymer;
    }

    return react(removeReactable(polymer, rIndex));
}


function reactIter(polymer) {
    while (true){
        let rIndex = findReactable(polymer.trim());

        if (rIndex === -1) return polymer;

        polymer = removeReactable(polymer, rIndex);
    }
}

fs.readFile('day5input', 'utf8', (err, polymer) => {
    let reacted = reactIter(polymer).trim();
    console.log('After reaction, the polymer contains ' 
            + reacted.length
            + ' units');

    let min = 50000;
    let alph = 'abcdefghijklmnopqrstuvwxyz';

    for (let l of alph) {
        let regex = '[' + l + '|' + l.toUpperCase() + ']';
        let test = react(reacted.replace( new RegExp(regex, 'g'), ''));
        if (test.length < min) {
            min = test.length;
        }
    }

    console.log('New polymer length: ' + min);

});

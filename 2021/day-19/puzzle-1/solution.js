const { readFileSync, cp } = require("fs");
const { performance } = require("perf_hooks");
const { resolve } = require("path");
const { zip, sum, counter, range, cartProduct, group, enumerate } = require("../../utils");
const { exit } = require("process");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim().split('\n\n\n');

const rotations = generateRotations();
let scanners;
function solution(input) {
    scanners = input.split('\n\n')
        .map(s => s.split('\n').slice(1).map(c => c.split(',').map(d => +d)));
    scanners.forEach(s => s.matches = []);

    for (const [i, scanner] of enumerate(scanners)) {
        for (const other of scanners.slice(i + 1)){
            if (matchScanners(scanner, other)) {
                scanner.matches.push(other);
                other.matches.push(scanner);
            }
        }
    }
    return new Set(scanners.flatMap(s => s.map(p => p.join()))).size;
}

function matchScanners(scanner, other) {
    if (scannersInSameSpace(scanner).has(other)) {
        return false;
    }
    for (const rotation of rotations) {
        rotate(other, rotation);
        // Since 12 points should match, we are guaranteed
        // to have at least one match even if we remove 11
        for (const p1 of scanner.slice(11)) {
            for (const p2 of other) {
                const delta = sub(p1, p2);
                moveScanner(other, delta);
                if (isMatch(scanner, other)) {
                    moveScanner(other, sub([0, 0, 0], delta));
                    unrotate(other, rotation);
                    transformSubSpace(other, rotation, delta);
                    return true;
                }
                moveScanner(other, sub([0, 0, 0], delta));
            }
        }
        unrotate(other, rotation);
    }
    return false;
}

function transformSubSpace(scanner, rotation, delta) {
    const subSpace = scannersInSameSpace(scanner);
    console.log("Transforming subSpace:", [...subSpace].map(s => scanners.indexOf(s)));
    for (const s of subSpace) {
        rotate(s, rotation);
        moveScanner(s, delta);
    }
}

function scannersInSameSpace(scanner) {
    const toProcess = [scanner];
    const seen = new Set([scanner]);
    while (toProcess.length) {
        const current = toProcess.pop();
        const toAdd = current.matches.filter(m => !seen.has(m));
        toProcess.push(...toAdd);
        toAdd.forEach(s => seen.add(s));
    }
    return seen;
}

function stringify(scanner) {
    return scanner.map(p => p.join());
}

function isMatch(scanner, other) {
    return (scanner.length + other.length) - new Set([...stringify(scanner), ...stringify(other)]).size >= 12;
}

function moveScanner(scanner, delta) {
    scanner.forEach(p => Object.assign(p, add(p, delta)));
}

function rotate(scanner, rotation) {
    scanner.forEach(p => Object.assign(p, matMult(rotation, p)));
}

function unrotate(scanner, rotation) {
    rotate(scanner, zip(...rotation));
}

function add(a, b) {
    return a.map((x, i) => x + b[i]);
}

function sub(a, b) {
    return a.map((x, i) => x - b[i]);
}

function matMult(mat, vec) {
    return mat.map(row => sum(vec.map((x, i) => row[i] * x)));
}

function generateRotations() {
    const rotations = [];
    for (const axis of [0, 1, 2]) {
        for (const value of [1, -1]) {
            const x = [0, 0, 0];
            x[axis] = value;
            for (const otherAxis of [0, 1, 2].filter(a => a !== axis)) {
                for (const value of [1, -1]) {
                    const y = [0, 0, 0];
                    y[otherAxis] = value;
                    const z = cross(x, y);
                    rotations.push([x, y, z]);
                }
            }
        }
    }
    return rotations;
}

function cross(a, b) {
    return [
        a[1] * b[2] - a[2] * b[1],
        a[2] * b[0] - a[0] * b[2],
        a[0] * b[1] - a[1] * b[0],
    ]
}

const [testInput, expected] = test;
const s = solution(testInput)
console.assert(s === parseInt(expected, 10), `Got ${s}, expected ${expected}`);

console.log(solution(input));

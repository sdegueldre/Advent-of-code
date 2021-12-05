const { readFileSync } = require("fs");
const { resolve } = require("path");
const { zip, sum } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n');

function solution(input) {
    const lines = input.split('\n')
        .map(l => l.split(" -> ")
            .map(p => p.split(",")
                .map(n => +n)
            )
        );
    const points = [];
    for (const [[x1, y1], [x2, y2]] of lines) {
        if (x1 !== x2 && y1 !== y2) {
            continue;
        }
        for (const [x, y] of pointsBetween([x1, y1], [x2, y2])) {
            if (!points[x]) {
                points[x] = [];
            }
            points[x][y] = (points[x][y] || 0) + 1;
        }
    }
    return points.flat().reduce((acc, v) => acc + (v >= 2), 0);
}

function* pointsBetween(a, b) {
    const [xs, ys] = zip(a, b).map(arr => arr.sort((a, b) => a - b));
    for(let x = xs[0]; x <= xs[1]; x++) {
        for(let y = ys[0]; y <= ys[1]; y++) {
            yield [x, y];
        }
    }
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));
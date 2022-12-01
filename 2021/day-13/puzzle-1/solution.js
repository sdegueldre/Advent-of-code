const { readFileSync, cp } = require("fs");
const { resolve } = require("path");
const { zip, sum, counter, range, cartProduct } = require("../../utils");

const input = readFileSync(resolve(__dirname, "./input")).toString().trim();
const test = readFileSync(resolve(__dirname, "./test")).toString().trim();

const [testInput, expected] = test.split('\n\n\n');


function solution(input) {
    const [points, instructions] = input.split('\n\n');
    const coords = points.split('\n').map(l => l.split(',').map(n => +n));
    const folds = instructions
        .split('\n')
        .map(l => l.split(' ')[2]
            .split('=')
        ).map(([dim, pos]) => [dim == 'x' ? 0 : 1, +pos])
        .slice(0, 1);
    for (const [dim, pos] of folds) {
        for (const point of coords) {
            if (point[dim] <= pos) {
                continue;
            }
            point[dim] = (point[dim] - pos) * -1 + pos;
        }
    }
    return new Set(coords.map(p => p.join())).size;
}

console.assert(solution(testInput) === parseInt(expected, 10));

console.log(solution(input));